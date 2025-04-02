
import { pool } from '../../../config/database';

export interface NFeModel {
  id?: number;
  chave_acesso?: string;
  numero?: number;
  serie: string;
  modelo: '55' | '65';
  data_emissao: Date;
  natureza_operacao: string;
  tipo_operacao: '0' | '1'; // 0-Entrada, 1-Saída
  
  destinatario_tipo: 'CPF' | 'CNPJ';
  destinatario_numero: string;
  destinatario_nome: string;
  destinatario_ie?: string;
  destinatario_email?: string;
  
  valor_produtos: number;
  valor_frete?: number;
  valor_seguro?: number;
  valor_desconto?: number;
  valor_total: number;
  
  forma_pagamento: string;
  status: 'rascunho' | 'processando' | 'autorizada' | 'rejeitada' | 'cancelada';
  
  xml_enviado?: string;
  xml_retorno?: string;
  xml_cancelamento?: string;
  
  protocolo_autorizacao?: string;
  protocolo_cancelamento?: string;
  
  data_autorizacao?: Date;
  data_cancelamento?: Date;
  
  motivo_cancelamento?: string;
  mensagem_sefaz?: string;
  
  usuario_id: number;
  empresa_id: number;
  
  created_at?: Date;
  updated_at?: Date;
}

class NFe {
  async create(nfe: NFeModel): Promise<NFeModel> {
    const connection = await pool.getConnection();
    
    try {
      // Inicia uma transação
      await connection.beginTransaction();
      
      // Insere a NF-e principal
      const [result] = await connection.query(
        `INSERT INTO nfe (
          serie, modelo, data_emissao, natureza_operacao, tipo_operacao,
          destinatario_tipo, destinatario_numero, destinatario_nome, 
          destinatario_ie, destinatario_email, valor_produtos, valor_frete,
          valor_seguro, valor_desconto, valor_total, forma_pagamento, status,
          usuario_id, empresa_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          nfe.serie, nfe.modelo, nfe.data_emissao, nfe.natureza_operacao,
          nfe.tipo_operacao, nfe.destinatario_tipo, nfe.destinatario_numero,
          nfe.destinatario_nome, nfe.destinatario_ie, nfe.destinatario_email,
          nfe.valor_produtos, nfe.valor_frete, nfe.valor_seguro,
          nfe.valor_desconto, nfe.valor_total, nfe.forma_pagamento,
          nfe.status, nfe.usuario_id, nfe.empresa_id
        ]
      );
      
      // Confirma a transação
      await connection.commit();
      
      // Retorna o objeto com o ID
      const id = result.insertId;
      return { ...nfe, id };
    } catch (error) {
      // Desfaz a transação em caso de erro
      await connection.rollback();
      throw error;
    } finally {
      // Libera a conexão de volta para o pool
      connection.release();
    }
  }

  async update(id: number, nfe: Partial<NFeModel>): Promise<void> {
    const connection = await pool.getConnection();
    
    try {
      // Prepara os campos e valores para atualização
      const fields = Object.keys(nfe)
        .filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at')
        .map(key => `${key} = ?`);
      
      const values = Object.keys(nfe)
        .filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at')
        .map(key => nfe[key as keyof NFeModel]);

      // Adiciona o ID no final dos valores
      values.push(id);
      
      // Executa a atualização
      await connection.query(
        `UPDATE nfe SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
        values
      );
    } finally {
      connection.release();
    }
  }

  async findById(id: number): Promise<NFeModel | null> {
    const [rows] = await pool.query('SELECT * FROM nfe WHERE id = ?', [id]);
    const nfeRows = rows as NFeModel[];
    
    return nfeRows.length ? nfeRows[0] : null;
  }

  async findByChave(chave: string): Promise<NFeModel | null> {
    const [rows] = await pool.query('SELECT * FROM nfe WHERE chave_acesso = ?', [chave]);
    const nfeRows = rows as NFeModel[];
    
    return nfeRows.length ? nfeRows[0] : null;
  }

  async findAll(empresaId: number, filters?: { 
    status?: string; 
    dataInicio?: Date; 
    dataFim?: Date;
    destinatario?: string;
  }): Promise<NFeModel[]> {
    let query = 'SELECT * FROM nfe WHERE empresa_id = ?';
    const params = [empresaId];
    
    // Adiciona filtros à consulta
    if (filters) {
      if (filters.status) {
        query += ' AND status = ?';
        params.push(filters.status);
      }
      
      if (filters.dataInicio) {
        query += ' AND data_emissao >= ?';
        params.push(filters.dataInicio);
      }
      
      if (filters.dataFim) {
        query += ' AND data_emissao <= ?';
        params.push(filters.dataFim);
      }
      
      if (filters.destinatario) {
        query += ' AND (destinatario_nome LIKE ? OR destinatario_numero LIKE ?)';
        const term = `%${filters.destinatario}%`;
        params.push(term, term);
      }
    }
    
    query += ' ORDER BY data_emissao DESC';
    
    const [rows] = await pool.query(query, params);
    return rows as NFeModel[];
  }
}

export default new NFe();
