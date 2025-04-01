
import { pool } from '../../../config/database';
import { User, UserDTO } from '../models/user.model';
import bcrypt from 'bcrypt';

export class UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.query<User[]>(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    return rows[0] || null;
  }
  
  async findById(id: number): Promise<UserDTO | null> {
    const [rows] = await pool.query<User[]>(
      'SELECT id, username, email, name, role FROM users WHERE id = ? AND active = 1',
      [id]
    );
    
    if (!rows[0]) return null;
    
    const { password, ...userWithoutPassword } = rows[0];
    return userWithoutPassword;
  }
  
  async create(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<UserDTO> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    const [result] = await pool.query(
      `INSERT INTO users 
       (username, email, password, name, role, active, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [user.username, user.email, hashedPassword, user.name, user.role, user.active]
    );
    
    const id = (result as any).insertId;
    
    return {
      id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role
    };
  }
}
