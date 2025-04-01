
import { Request, Response } from 'express';
import { LancamentoService } from '../services/lancamento.service';
import { ValidationError } from '../../../shared/errors/app-error';

export class LancamentoController {
  private service: LancamentoService;
  
  constructor() {
    this.service = new LancamentoService();
  }
  
  listarLancamentos = async (req: Request, res: Response): Promise<Response> => {
    const lancamentos = await this.service.listarLancamentos();
    return res.json(lancamentos);
  }
  
  obterLancamento = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      throw new ValidationError('ID inválido');
    }
    
    const lancamento = await this.service.obterLancamento(Number(id));
    return res.json(lancamento);
  }
  
  criarLancamento = async (req: Request, res: Response): Promise<Response> => {
    const lancamento = await this.service.criarLancamento(req.body);
    return res.status(201).json(lancamento);
  }
  
  atualizarLancamento = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      throw new ValidationError('ID inválido');
    }
    
    const lancamento = await this.service.atualizarLancamento(Number(id), req.body);
    return res.json(lancamento);
  }
  
  excluirLancamento = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      throw new ValidationError('ID inválido');
    }
    
    await this.service.excluirLancamento(Number(id));
    return res.status(204).send();
  }
}
