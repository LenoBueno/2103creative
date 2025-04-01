
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ValidationError } from '../../../shared/errors/app-error';

export class AuthController {
  private authService: AuthService;
  
  constructor() {
    this.authService = new AuthService();
  }
  
  login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      throw new ValidationError('Usuário e senha são obrigatórios');
    }
    
    const auth = await this.authService.login({ username, password });
    
    return res.json(auth);
  }
  
  validateToken = async (req: Request, res: Response): Promise<Response> => {
    const { token } = req.body;
    
    if (!token) {
      throw new ValidationError('Token é obrigatório');
    }
    
    const user = await this.authService.validateToken(token);
    
    return res.json({ valid: true, user });
  }
  
  getProfile = async (req: Request, res: Response): Promise<Response> => {
    // Autenticação já verificada no middleware
    if (!req.user?.id) {
      throw new ValidationError('Usuário não autenticado');
    }
    
    return res.json({ user: req.user });
  }
}
