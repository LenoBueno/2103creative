
import { Request, Response } from 'express';
import { ClienteService } from '../services/cliente.service';
import { ValidationError } from '../../../shared/errors/app-error';

export class ClienteController {
  private service: ClienteService;
  
  constructor() {
    this.service = new ClienteService();
  }
  
  listarClientes = async (req: Request, res: Response): Promise<Response> => {
    const clientes = await this.service.listarClientes();
    return res.json(clientes);
  }
  
  obterCliente = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      throw new ValidationError('ID inválido');
    }
    
    const cliente = await this.service.obterCliente(Number(id));
    return res.json(cliente);
  }
  
  criarCliente = async (req: Request, res: Response): Promise<Response> => {
    const cliente = await this.service.criarCliente(req.body);
    return res.status(201).json(cliente);
  }
  
  atualizarCliente = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      throw new ValidationError('ID inválido');
    }
    
    const cliente = await this.service.atualizarCliente(Number(id), req.body);
    return res.json(cliente);
  }
  
  excluirCliente = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      throw new ValidationError('ID inválido');
    }
    
    await this.service.excluirCliente(Number(id));
    return res.status(204).send();
  }
}
