
import { Request, Response } from 'express';
import nfeService from '../services/nfe.service';
import { AppError } from '../../../shared/errors/app-error';

class NFeController {
  // Emitir NF-e (criar nova ou enviar rascunho)
  async emitir(req: Request, res: Response): Promise<Response> {
    try {
      const nfeData = req.body;
      const userId = req.user?.id;
      const empresaId = req.user?.empresa_id;
      
      if (!userId || !empresaId) {
        throw new AppError('Usuário não autenticado', 401);
      }
      
      const result = await nfeService.emitir(nfeData, userId, empresaId);
      
      return res.status(200).json({
        success: true,
        message: 'NF-e emitida com sucesso',
        data: result
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }
      
      console.error('Erro ao emitir NF-e:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao processar a requisição',
      });
    }
  }
  
  // Salvar rascunho de NF-e
  async salvarRascunho(req: Request, res: Response): Promise<Response> {
    try {
      const nfeData = req.body;
      const userId = req.user?.id;
      const empresaId = req.user?.empresa_id;
      
      if (!userId || !empresaId) {
        throw new AppError('Usuário não autenticado', 401);
      }
      
      const result = await nfeService.salvarRascunho(nfeData, userId, empresaId);
      
      return res.status(200).json({
        success: true,
        message: 'Rascunho salvo com sucesso',
        data: { id: result.id }
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }
      
      console.error('Erro ao salvar rascunho:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao processar a requisição',
      });
    }
  }
  
  // Cancelar NF-e
  async cancelar(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { justificativa } = req.body;
      const userId = req.user?.id;
      const empresaId = req.user?.empresa_id;
      
      if (!userId || !empresaId) {
        throw new AppError('Usuário não autenticado', 401);
      }
      
      if (!justificativa || justificativa.length < 15) {
        throw new AppError('A justificativa deve ter pelo menos 15 caracteres', 400);
      }
      
      const result = await nfeService.cancelar(parseInt(id), justificativa, empresaId);
      
      return res.status(200).json({
        success: true,
        message: 'NF-e cancelada com sucesso',
        data: result
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }
      
      console.error('Erro ao cancelar NF-e:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao processar a requisição',
      });
    }
  }
  
  // Consultar NF-e por ID
  async consultarPorId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const empresaId = req.user?.empresa_id;
      
      if (!empresaId) {
        throw new AppError('Usuário não autenticado', 401);
      }
      
      const nfe = await nfeService.consultarPorId(parseInt(id), empresaId);
      
      return res.status(200).json({
        success: true,
        data: nfe
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }
      
      console.error('Erro ao consultar NF-e:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao processar a requisição',
      });
    }
  }
  
  // Listar NF-e
  async listar(req: Request, res: Response): Promise<Response> {
    try {
      const empresaId = req.user?.empresa_id;
      
      if (!empresaId) {
        throw new AppError('Usuário não autenticado', 401);
      }
      
      const { status, dataInicio, dataFim, destinatario } = req.query;
      
      const filters: any = {};
      
      if (status) filters.status = status as string;
      if (dataInicio) filters.dataInicio = new Date(dataInicio as string);
      if (dataFim) filters.dataFim = new Date(dataFim as string);
      if (destinatario) filters.destinatario = destinatario as string;
      
      const nfes = await nfeService.listar(empresaId, filters);
      
      return res.status(200).json({
        success: true,
        data: nfes
      });
    } catch (error) {
      console.error('Erro ao listar NF-e:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao processar a requisição',
      });
    }
  }
  
  // Gerar DANFE (PDF)
  async gerarDANFE(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const empresaId = req.user?.empresa_id;
      
      if (!empresaId) {
        throw new AppError('Usuário não autenticado', 401);
      }
      
      const pdf = await nfeService.gerarDANFE(parseInt(id), empresaId);
      
      // Configurar headers para download do PDF
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=nfe_${id}.pdf`);
      
      return res.status(200).send(pdf);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }
      
      console.error('Erro ao gerar DANFE:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao processar a requisição',
      });
    }
  }
}

export default new NFeController();
