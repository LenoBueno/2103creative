
import { pool } from '../../../config/database';
import { Cliente, ClienteDTO } from '../models/cliente.model';

export class ClienteRepository {
  async findAll(): Promise<Cliente[]> {
    const [rows] = await pool.query(`
      SELECT * FROM clientes
      ORDER BY nome
    `);
    
    return rows as Cliente[];
  }
  
  async findById(id: number): Promise<Cliente | null> {
    const [rows] = await pool.query<Cliente[]>(
      'SELECT * FROM clientes WHERE id = ?',
      [id]
    );
    
    return rows[0] || null;
  }
  
  async findByCode(codigo: string): Promise<Cliente | null> {
    const [rows] = await pool.query<Cliente[]>(
      'SELECT * FROM clientes WHERE codigo = ?',
      [codigo]
    );
    
    return rows[0] || null;
  }
  
  async create(cliente: ClienteDTO): Promise<Cliente> {
    const [result] = await pool.query(
      `INSERT INTO clientes 
       (codigo, nome, cnpj_cpf, email, telefone, contato_nome, contato_telefone, cidade, uf, cep, score, data_cadastro, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
      [
        cliente.codigo,
        cliente.nome,
        cliente.cnpj_cpf,
        cliente.email,
        cliente.telefone,
        cliente.contato_nome,
        cliente.contato_telefone,
        cliente.cidade,
        cliente.uf,
        cliente.cep,
        cliente.score || 'C'
      ]
    );
    
    const id = (result as any).insertId;
    const created = await this.findById(id);
    
    if (!created) {
      throw new Error('Erro ao criar cliente');
    }
    
    return created;
  }
  
  async update(id: number, cliente: Partial<ClienteDTO>): Promise<Cliente | null> {
    const fieldsToUpdate = Object.entries(cliente)
      .filter(([_, value]) => value !== undefined)
      .map(([key, _]) => `${key} = ?`);
      
    if (fieldsToUpdate.length === 0) {
      return this.findById(id);
    }
    
    const values = Object.entries(cliente)
      .filter(([_, value]) => value !== undefined)
      .map(([_, value]) => value);
      
    await pool.query(
      `UPDATE clientes 
       SET ${fieldsToUpdate.join(', ')}, updated_at = NOW() 
       WHERE id = ?`,
      [...values, id]
    );
    
    return this.findById(id);
  }
  
  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query(
      'DELETE FROM clientes WHERE id = ?',
      [id]
    );
    
    return (result as any).affectedRows > 0;
  }
  
  async countClientes(): Promise<number> {
    const [result] = await pool.query('SELECT COUNT(*) as count FROM clientes');
    return (result as any)[0].count;
  }
}
