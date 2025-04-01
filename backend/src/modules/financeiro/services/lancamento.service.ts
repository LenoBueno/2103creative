
import { LancamentoRepository } from '../repositories/lancamento.repository';
import { Lancamento, LancamentoDTO } from '../models/lancamento.model';
import { NotFoundError, ValidationError } from '../../../shared/errors/app-error';

export class LancamentoService {
  private repository: LancamentoRepository;
  
  constructor() {
    this.repository = new LancamentoRepository();
  }
  
  async listarLancamentos(): Promise<Lancamento[]> {
    return this.repository.findAll();
  }
  
  async obterLancamento(id: number): Promise<Lancamento> {
    const lancamento = await this.repository.findById(id);
    
    if (!lancamento) {
      throw new NotFoundError('Lançamento');
    }
    
    return lancamento;
  }
  
  async criarLancamento(dados: LancamentoDTO): Promise<Lancamento> {
    this.validarLancamento(dados);
    return this.repository.create(dados);
  }
  
  async atualizarLancamento(id: number, dados: Partial<LancamentoDTO>): Promise<Lancamento> {
    const lancamento = await this.repository.findById(id);
    
    if (!lancamento) {
      throw new NotFoundError('Lançamento');
    }
    
    const updated = await this.repository.update(id, dados);
    
    if (!updated) {
      throw new Error('Erro ao atualizar lançamento');
    }
    
    return updated;
  }
  
  async excluirLancamento(id: number): Promise<void> {
    const lancamento = await this.repository.findById(id);
    
    if (!lancamento) {
      throw new NotFoundError('Lançamento');
    }
    
    const deleted = await this.repository.delete(id);
    
    if (!deleted) {
      throw new Error('Erro ao excluir lançamento');
    }
  }
  
  private validarLancamento(dados: LancamentoDTO): void {
    if (!dados.data) {
      throw new ValidationError('Data é obrigatória');
    }
    
    if (!dados.documento) {
      throw new ValidationError('Documento é obrigatório');
    }
    
    if (!dados.conta_id) {
      throw new ValidationError('Conta contábil é obrigatória');
    }
    
    if (!dados.descricao) {
      throw new ValidationError('Descrição é obrigatória');
    }
    
    if (!dados.valor || dados.valor <= 0) {
      throw new ValidationError('Valor deve ser maior que zero');
    }
    
    if (!['receita', 'despesa', 'transferencia'].includes(dados.tipo)) {
      throw new ValidationError('Tipo inválido');
    }
    
    if (!['pendente', 'confirmado', 'cancelado'].includes(dados.status)) {
      throw new ValidationError('Status inválido');
    }
  }
}
