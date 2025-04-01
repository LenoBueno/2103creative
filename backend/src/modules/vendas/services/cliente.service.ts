
import { ClienteRepository } from '../repositories/cliente.repository';
import { Cliente, ClienteDTO } from '../models/cliente.model';
import { NotFoundError, ValidationError } from '../../../shared/errors/app-error';

export class ClienteService {
  private repository: ClienteRepository;
  
  constructor() {
    this.repository = new ClienteRepository();
  }
  
  async listarClientes(): Promise<Cliente[]> {
    return this.repository.findAll();
  }
  
  async obterCliente(id: number): Promise<Cliente> {
    const cliente = await this.repository.findById(id);
    
    if (!cliente) {
      throw new NotFoundError('Cliente');
    }
    
    return cliente;
  }
  
  async criarCliente(dados: ClienteDTO): Promise<Cliente> {
    this.validarCliente(dados);
    
    // Verifica código duplicado
    if (dados.codigo) {
      const existente = await this.repository.findByCode(dados.codigo);
      
      if (existente) {
        throw new ValidationError(`Cliente com código ${dados.codigo} já existe`);
      }
    } else {
      // Gera código automático
      const count = await this.repository.countClientes();
      dados.codigo = `C-${(count + 1).toString().padStart(4, '0')}`;
    }
    
    return this.repository.create(dados);
  }
  
  async atualizarCliente(id: number, dados: Partial<ClienteDTO>): Promise<Cliente> {
    const cliente = await this.repository.findById(id);
    
    if (!cliente) {
      throw new NotFoundError('Cliente');
    }
    
    if (dados.codigo && dados.codigo !== cliente.codigo) {
      const existente = await this.repository.findByCode(dados.codigo);
      
      if (existente) {
        throw new ValidationError(`Cliente com código ${dados.codigo} já existe`);
      }
    }
    
    const updated = await this.repository.update(id, dados);
    
    if (!updated) {
      throw new Error('Erro ao atualizar cliente');
    }
    
    return updated;
  }
  
  async excluirCliente(id: number): Promise<void> {
    const cliente = await this.repository.findById(id);
    
    if (!cliente) {
      throw new NotFoundError('Cliente');
    }
    
    const deleted = await this.repository.delete(id);
    
    if (!deleted) {
      throw new Error('Erro ao excluir cliente');
    }
  }
  
  private validarCliente(dados: ClienteDTO): void {
    if (!dados.nome || dados.nome.trim() === '') {
      throw new ValidationError('Nome é obrigatório');
    }
    
    if (!dados.cnpj_cpf || dados.cnpj_cpf.trim() === '') {
      throw new ValidationError('CNPJ/CPF é obrigatório');
    }
    
    if (!dados.cidade || dados.cidade.trim() === '') {
      throw new ValidationError('Cidade é obrigatória');
    }
    
    if (!dados.uf || dados.uf.trim() === '') {
      throw new ValidationError('UF é obrigatória');
    }
  }
}
