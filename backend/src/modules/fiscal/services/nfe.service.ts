
import { v4 as uuidv4 } from 'uuid';
import nfeModel, { NFeModel } from '../models/nfe.model';
import sefazService from './sefaz.service';
import certificadoService from './certificado.service';
import { AppError } from '../../../shared/errors/app-error';
import { NotFoundError } from '../../../shared/errors/app-error';

class NFeService {
  // Emitir NF-e completa (gerar XML e enviar para SEFAZ)
  async emitir(nfeData: any, userId: number, empresaId: number) {
    // 1. Validar dados
    this.validarDados(nfeData);
    
    // 2. Calcular tributos (em um cenário real, isso seria muito mais complexo)
    const dadosProcessados = this.processarDadosFiscais(nfeData);
    
    try {
      // 3. Salvar ou atualizar no banco como "processando"
      let nfe: NFeModel;
      
      if (nfeData.id) {
        // Atualizar rascunho existente
        const nfeExistente = await nfeModel.findById(nfeData.id);
        
        if (!nfeExistente || nfeExistente.empresa_id !== empresaId) {
          throw new NotFoundError('NF-e não encontrada');
        }
        
        if (nfeExistente.status !== 'rascunho') {
          throw new AppError('Apenas rascunhos podem ser emitidos', 400);
        }
        
        await nfeModel.update(nfeData.id, {
          ...dadosProcessados,
          status: 'processando',
          updated_at: new Date()
        });
        
        nfe = {
          ...nfeExistente,
          ...dadosProcessados,
          status: 'processando'
        };
      } else {
        // Criar nova NF-e
        nfe = await nfeModel.create({
          ...dadosProcessados,
          usuario_id: userId,
          empresa_id: empresaId,
          status: 'processando',
          data_emissao: new Date()
        });
      }
      
      // 4. Gerar XML da NF-e
      const xml = this.gerarXML(nfe);
      
      // 5. Obter certificado digital
      const certificado = await certificadoService.obterCertificado(empresaId);
      
      if (!certificado) {
        throw new AppError('Certificado digital não configurado', 400);
      }
      
      // 6. Assinar XML
      const xmlAssinado = await sefazService.assinarXML(
        xml, 
        certificado.caminho, 
        certificado.senha
      );
      
      // 7. Enviar para SEFAZ
      const resposta = await sefazService.enviarNFe(xmlAssinado, 'RS'); // UF RS hardcoded para demonstração
      
      if (!resposta.sucesso) {
        // Atualizar status para rejeição
        await nfeModel.update(nfe.id!, {
          status: 'rejeitada',
          mensagem_sefaz: resposta.mensagem,
          xml_enviado: xmlAssinado,
          xml_retorno: resposta.xml_retorno
        });
        
        throw new AppError(`Erro na autorização: ${resposta.mensagem}`, 400);
      }
      
      // 8. Atualizar com dados de autorização
      const chaveAcesso = this.extrairChaveAcesso(resposta.xml_retorno!);
      
      await nfeModel.update(nfe.id!, {
        status: 'autorizada',
        chave_acesso: chaveAcesso,
        protocolo_autorizacao: resposta.protocolo,
        data_autorizacao: new Date(),
        xml_enviado: xmlAssinado,
        xml_retorno: resposta.xml_retorno,
        mensagem_sefaz: resposta.mensagem,
        numero: this.extrairNumero(resposta.xml_retorno!)
      });
      
      // 9. Retornar dados da NF-e autorizada
      return {
        id: nfe.id,
        chaveAcesso,
        protocolo: resposta.protocolo,
        status: 'autorizada'
      };
    } catch (error) {
      if (nfeData.id) {
        // Se for um rascunho que falhou, voltar ao status original
        await nfeModel.update(nfeData.id, { status: 'rascunho' });
      }
      
      throw error;
    }
  }
  
  // Salvar rascunho
  async salvarRascunho(nfeData: any, userId: number, empresaId: number): Promise<NFeModel> {
    // Salvar dados básicos sem validação completa
    const dadosParciais = {
      ...nfeData,
      status: 'rascunho'
    };
    
    if (nfeData.id) {
      // Atualizar rascunho existente
      const nfeExistente = await nfeModel.findById(nfeData.id);
      
      if (!nfeExistente || nfeExistente.empresa_id !== empresaId) {
        throw new NotFoundError('NF-e não encontrada');
      }
      
      if (nfeExistente.status !== 'rascunho') {
        throw new AppError('Apenas rascunhos podem ser modificados', 400);
      }
      
      await nfeModel.update(nfeData.id, dadosParciais);
      return { ...nfeExistente, ...dadosParciais };
    } else {
      // Criar novo rascunho
      return await nfeModel.create({
        ...dadosParciais,
        usuario_id: userId,
        empresa_id: empresaId,
        data_emissao: new Date()
      });
    }
  }
  
  // Cancelar NF-e
  async cancelar(id: number, justificativa: string, empresaId: number) {
    // 1. Buscar NF-e
    const nfe = await nfeModel.findById(id);
    
    if (!nfe) {
      throw new NotFoundError('NF-e não encontrada');
    }
    
    if (nfe.empresa_id !== empresaId) {
      throw new AppError('Acesso negado', 403);
    }
    
    if (nfe.status !== 'autorizada') {
      throw new AppError('Apenas notas autorizadas podem ser canceladas', 400);
    }
    
    if (!nfe.chave_acesso) {
      throw new AppError('NF-e sem chave de acesso', 400);
    }
    
    // 2. Verificar limite de tempo para cancelamento (30min por padrão)
    if (nfe.data_autorizacao) {
      const agora = new Date();
      const diferencaEmMinutos = (agora.getTime() - nfe.data_autorizacao.getTime()) / (1000 * 60);
      
      // Em ambiente real seria 30min, mas para teste reduzimos
      if (diferencaEmMinutos > 1000) {
        throw new AppError('Prazo de cancelamento expirado (limite de 30 minutos)', 400);
      }
    }
    
    // 3. Obter certificado digital
    const certificado = await certificadoService.obterCertificado(empresaId);
    
    if (!certificado) {
      throw new AppError('Certificado digital não configurado', 400);
    }
    
    // 4. Enviar requisição de cancelamento para SEFAZ
    const resposta = await sefazService.cancelarNFe(
      nfe.chave_acesso,
      justificativa,
      'RS' // UF RS hardcoded para demonstração
    );
    
    if (!resposta.sucesso) {
      throw new AppError(`Erro no cancelamento: ${resposta.mensagem}`, 400);
    }
    
    // 5. Atualizar dados de cancelamento
    await nfeModel.update(id, {
      status: 'cancelada',
      data_cancelamento: new Date(),
      motivo_cancelamento: justificativa,
      protocolo_cancelamento: resposta.protocolo,
      xml_cancelamento: resposta.xml_retorno
    });
    
    return {
      id,
      protocolo: resposta.protocolo,
      status: 'cancelada'
    };
  }
  
  // Consultar NF-e por ID
  async consultarPorId(id: number, empresaId: number) {
    const nfe = await nfeModel.findById(id);
    
    if (!nfe) {
      throw new NotFoundError('NF-e não encontrada');
    }
    
    if (nfe.empresa_id !== empresaId) {
      throw new AppError('Acesso negado', 403);
    }
    
    return nfe;
  }
  
  // Listar NF-e
  async listar(empresaId: number, filters?: any) {
    return await nfeModel.findAll(empresaId, filters);
  }
  
  // Gerar DANFE em PDF
  async gerarDANFE(id: number, empresaId: number): Promise<Buffer> {
    const nfe = await nfeModel.findById(id);
    
    if (!nfe) {
      throw new NotFoundError('NF-e não encontrada');
    }
    
    if (nfe.empresa_id !== empresaId) {
      throw new AppError('Acesso negado', 403);
    }
    
    if (nfe.status !== 'autorizada' && nfe.status !== 'cancelada') {
      throw new AppError('Apenas notas autorizadas ou canceladas possuem DANFE', 400);
    }
    
    if (!nfe.xml_retorno) {
      throw new AppError('XML de retorno não encontrado', 400);
    }
    
    // Gerar PDF do DANFE
    const pdfBuffer = await sefazService.gerarDANFE(nfe.xml_retorno);
    
    return pdfBuffer;
  }
  
  // Métodos auxiliares
  private validarDados(nfeData: any) {
    // Validação simplificada, em um ambiente real seria muito mais extenso
    if (!nfeData.destinatario?.nome || !nfeData.destinatario?.numero) {
      throw new AppError('Dados do destinatário incompletos', 400);
    }
    
    if (!nfeData.itens || !nfeData.itens.length) {
      throw new AppError('A NF-e precisa conter pelo menos um item', 400);
    }
    
    return true;
  }
  
  private processarDadosFiscais(nfeData: any) {
    // Em um ambiente real, aqui teríamos cálculos complexos de impostos
    // Este é um exemplo muito simplificado
    
    // Calcular totais
    const valorProdutos = nfeData.itens.reduce(
      (total: number, item: any) => total + (parseFloat(item.valorTotal) || 0),
      0
    );
    
    const valorFrete = parseFloat(nfeData.valorFrete) || 0;
    const valorSeguro = parseFloat(nfeData.valorSeguro) || 0;
    const valorDesconto = parseFloat(nfeData.valorDesconto) || 0;
    
    const valorTotal = valorProdutos + valorFrete + valorSeguro - valorDesconto;
    
    // Mapear os dados para o formato do modelo
    return {
      serie: nfeData.serie,
      modelo: nfeData.modelo,
      natureza_operacao: nfeData.naturezaOperacao,
      tipo_operacao: '1', // 1-Saída (assumindo NF-e de saída)
      
      destinatario_tipo: nfeData.destinatario.tipo,
      destinatario_numero: nfeData.destinatario.numero,
      destinatario_nome: nfeData.destinatario.nome,
      destinatario_ie: nfeData.destinatario.inscricaoEstadual,
      destinatario_email: nfeData.destinatario.email,
      
      valor_produtos: valorProdutos,
      valor_frete: valorFrete || null,
      valor_seguro: valorSeguro || null,
      valor_desconto: valorDesconto || null,
      valor_total: valorTotal,
      
      forma_pagamento: nfeData.pagamento?.forma
    };
  }
  
  private gerarXML(nfe: NFeModel): string {
    // Em um ambiente real, usaríamos uma biblioteca para gerar o XML
    // Este é um exemplo muito simplificado
    return `<?xml version="1.0" encoding="UTF-8"?>
            <NFe xmlns="http://www.portalfiscal.inf.br/nfe">
              <infNFe Id="NFe${uuidv4()}">
                <ide>
                  <serie>${nfe.serie}</serie>
                  <mod>${nfe.modelo}</mod>
                </ide>
              </infNFe>
            </NFe>`;
  }
  
  private extrairChaveAcesso(xml: string): string {
    // Em um ambiente real, parseariamos o XML
    // Este é um mock que gera uma chave aleatória
    const uf = '43'; // RS
    const anoMes = new Date().toISOString().substring(2, 8).replace(/-/g, '');
    const cnpj = '12345678000199';
    const modelo = '55';
    const serie = '001';
    const numero = Math.floor(Math.random() * 1000000).toString().padStart(9, '0');
    const forma = '1';
    const aleatorio = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    
    return `${uf}${anoMes}${cnpj}${modelo}${serie}${numero}${forma}${aleatorio}`;
  }
  
  private extrairNumero(xml: string): number {
    // Em um ambiente real, parseariamos o XML
    // Este mock gera um número aleatório
    return Math.floor(Math.random() * 1000000);
  }
}

export default new NFeService();
