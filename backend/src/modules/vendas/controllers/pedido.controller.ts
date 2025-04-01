
import { Request, Response } from 'express';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../models/cliente.model';
import { ValidationError } from '../../../shared/errors/app-error';

export class PedidoController {
  private service: PedidoService;
  
  constructor() {
    this.service = new PedidoService();
  }
  
  listarPedidos = async (req: Request, res: Response): Promise<Response> => {
    const pedidos = await this.service.listarPedidos();
    return res.json(pedidos);
  }
  
  obterPedido = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      throw new ValidationError('ID inválido');
    }
    
    const pedido = await this.service.obterPedido(Number(id));
    return res.json(pedido);
  }
  
  criarPedido = async (req: Request, res: Response): Promise<Response> => {
    const pedido = await this.service.criarPedido(req.body);
    return res.status(201).json(pedido);
  }
  
  atualizarStatusPedido = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!id || isNaN(Number(id))) {
      throw new ValidationError('ID inválido');
    }
    
    if (!status) {
      throw new ValidationError('Status é obrigatório');
    }
    
    const pedido = await this.service.atualizarStatusPedido(
      Number(id), 
      status as Pedido['status']
    );
    
    return res.json(pedido);
  }
  
  excluirPedido = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      throw new ValidationError('ID inválido');
    }
    
    await this.service.excluirPedido(Number(id));
    return res.status(204).send();
  }
}
