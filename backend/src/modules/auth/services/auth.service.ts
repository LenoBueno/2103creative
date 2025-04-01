
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { LoginCredentials, AuthResponse } from '../models/user.model';
import { UnauthorizedError } from '../../../shared/errors/app-error';
import { env } from '../../../config/env';

export class AuthService {
  private userRepository: UserRepository;
  
  constructor() {
    this.userRepository = new UserRepository();
  }
  
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Verifica usuário
    const user = await this.userRepository.findByUsername(credentials.username);
    
    if (!user) {
      throw new UnauthorizedError('Credenciais inválidas');
    }
    
    // Verifica se usuário está ativo
    if (!user.active) {
      throw new UnauthorizedError('Usuário desativado');
    }
    
    // Verifica senha
    const passwordMatch = await bcrypt.compare(credentials.password, user.password);
    
    if (!passwordMatch) {
      throw new UnauthorizedError('Credenciais inválidas');
    }
    
    // Gera token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRATION }
    );
    
    // Remove senha do objeto de retorno
    const { password, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token
    };
  }
  
  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number };
      const user = await this.userRepository.findById(decoded.id);
      
      if (!user) {
        throw new UnauthorizedError('Usuário não encontrado');
      }
      
      return user;
    } catch (error) {
      throw new UnauthorizedError('Token inválido ou expirado');
    }
  }
}
