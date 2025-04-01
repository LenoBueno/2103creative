
import { PedidoRepository } from '../repositories/pedido.repository';
import { Pedido, PedidoDTO, PedidoItem } from '../models/cliente.model';
import { NotFoundError, ValidationError } from '../../../shared/errors/app-error';

export class PedidoService {
  private repository: PedidoRepository;
  
  constructor() {
    this.repository = new PedidoRepository();
  }
  
  async listarPedidos(): Promise<Pedido[]> {
    return this.repository.findAll();
  }
  
  async obterPedido(id: number): Promise<{ pedido: Pedido; items: PedidoItem[] }> {
    const pedido = await this.repository.findById(id);
    
    if (!pedido) {
      throw new NotFoundError('Pedido');
    }
    
    const items = await this.repository.findItemsByPedidoId(id);
    
    return { pedido, items };
  }
  
  async criarPedido(dados: PedidoDTO): Promise<Pedido> {
    this.validarPedido(dados);
    return this.repository.createPedido(dados);
  }
  
  async atualizarStatusPedido(id: number, status: Pedido['status']): Promise<Pedido> {
    const pedido = await this.repository.findById(id);
    
    if (!pedido) {
      throw new NotFoundError('Pedido');
    }
    
    // Validação de workflow de status
    if (pedido.status === 'cancelado') {
      throw new ValidationError('Não é possível alterar um pedido cancelado');
    }
    
    if (pedido.status === 'concluido' && status !== 'cancelado') {
      throw new ValidationError('Pedido já está concluído');
    }
    
    const statusValidos = [
      'novo', 
      'aprovado', 
      'em_separacao', 
      'faturado', 
      'concluido', 
      'cancelado'
    ];
    
    if (!statusValidos.includes(status)) {
      throw new ValidationError('Status inválido');
    }
    
    const updated = await this.repository.updateStatus(id, status);
    
    if (!updated) {
      throw new Error('Erro ao atualizar status do pedido');
    }
    
    return updated;
  }
  
  async excluirPedido(id: number): Promise<void> {
    const pedido = await this.repository.findById(id);
    
    if (!pedido) {
      throw new NotFoundError('Pedido');
    }
    
    if (pedido.status !== 'novo' && pedido.status !== 'cancelado') {
      throw new ValidationError('Não é possível excluir um pedido em andamento');
    }
    
    const deleted = await this.repository.delete(id);
    
    if (!deleted) {
      throw new Error('Erro ao excluir pedido');
    }
  }
  
  private validarPedido(dados: PedidoDTO): void {
    if (!dados.data) {
      throw new ValidationError('Data é obrigatória');
    }
    
    if (!dados.cliente_id) {
      throw new ValidationError('Cliente é obrigatório');
    }
    
    if (!dados.items || dados.items.length === 0) {
      throw new ValidationError('Pedido deve ter pelo menos um item');
    }
    
    // Validação dos itens
    dados.items.forEach((item, index) => {
      if (!item.produto_id) {
        throw new ValidationError(`Item ${index + 1}: Produto é obrigatório`);
      }
      
      if (!item.quantidade || item.quantidade <= 0) {
        throw new ValidationError(`Item ${index + 1}: Quantidade deve ser maior que zero`);
      }
      
      if (!item.valor_unitario || item.valor_unitario < 0) {
        throw new ValidationError(`Item ${index + 1}: Valor unitário inválido`);
      }
    });
  }
}
