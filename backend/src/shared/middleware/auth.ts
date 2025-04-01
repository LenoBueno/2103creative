
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/app-error';
import { env } from '../../config/env';

interface TokenPayload {
  id: number;
  role: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Verifica header de autorização
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    throw new UnauthorizedError('Token não fornecido');
  }
  
  // Formato: "Bearer {token}"
  const parts = authHeader.split(' ');
  
  if (parts.length !== 2) {
    throw new UnauthorizedError('Formato de token inválido');
  }
  
  const [scheme, token] = parts;
  
  if (!/^Bearer$/i.test(scheme)) {
    throw new UnauthorizedError('Formato de token inválido');
  }
  
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    
    // Adiciona dados do usuário na requisição
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    
    return next();
  } catch (error) {
    throw new UnauthorizedError('Token inválido ou expirado');
  }
};
