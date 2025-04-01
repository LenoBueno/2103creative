
import { pool } from '../../../config/database';
import { Lancamento, LancamentoDTO } from '../models/lancamento.model';

export class LancamentoRepository {
  async findAll(): Promise<Lancamento[]> {
    const [rows] = await pool.query(`
      SELECT * FROM lancamentos 
      ORDER BY data DESC, id DESC
    `);
    
    return rows as Lancamento[];
  }
  
  async findById(id: number): Promise<Lancamento | null> {
    const [rows] = await pool.query<Lancamento[]>(
      'SELECT * FROM lancamentos WHERE id = ?',
      [id]
    );
    
    return rows[0] || null;
  }
  
  async create(lancamento: LancamentoDTO): Promise<Lancamento> {
    // Calcula débito/crédito baseado no tipo
    let debito = 0;
    let credito = 0;
    
    if (lancamento.tipo === 'receita') {
      debito = lancamento.valor;
    } else if (lancamento.tipo === 'despesa') {
      credito = lancamento.valor;
    } else {
      // Para transferências, é necessário definir manualmente
      debito = lancamento.debito || 0;
      credito = lancamento.credito || 0;
    }
    
    const [result] = await pool.query(
      `INSERT INTO lancamentos 
       (data, documento, conta_id, descricao, debito, credito, valor, tipo, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        lancamento.data, 
        lancamento.documento, 
        lancamento.conta_id,
        lancamento.descricao,
        debito,
        credito,
        lancamento.valor,
        lancamento.tipo,
        lancamento.status
      ]
    );
    
    const id = (result as any).insertId;
    const created = await this.findById(id);
    
    if (!created) {
      throw new Error('Erro ao criar lançamento');
    }
    
    return created;
  }
  
  async update(id: number, lancamento: Partial<LancamentoDTO>): Promise<Lancamento | null> {
    const fieldsToUpdate = Object.entries(lancamento)
      .filter(([_, value]) => value !== undefined)
      .map(([key, _]) => `${key} = ?`);
      
    if (fieldsToUpdate.length === 0) {
      return this.findById(id);
    }
    
    const values = Object.entries(lancamento)
      .filter(([_, value]) => value !== undefined)
      .map(([_, value]) => value);
      
    await pool.query(
      `UPDATE lancamentos 
       SET ${fieldsToUpdate.join(', ')}, updated_at = NOW() 
       WHERE id = ?`,
      [...values, id]
    );
    
    return this.findById(id);
  }
  
  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query(
      'DELETE FROM lancamentos WHERE id = ?',
      [id]
    );
    
    return (result as any).affectedRows > 0;
  }
}
