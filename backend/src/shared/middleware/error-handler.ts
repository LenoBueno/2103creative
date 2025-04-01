
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[ERROR] ${err}`);
  
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Erros não tratados
  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
  });
};
