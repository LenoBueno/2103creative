
import { pool } from '../../../config/database';
import { Pedido, PedidoDTO, PedidoItem, PedidoItemDTO } from '../models/cliente.model';

export class PedidoRepository {
  async findAll(): Promise<Pedido[]> {
    const [rows] = await pool.query(`
      SELECT p.*, COUNT(i.id) as items_count
      FROM pedidos p
      LEFT JOIN pedido_items i ON p.id = i.pedido_id
      GROUP BY p.id
      ORDER BY p.data DESC, p.id DESC
    `);
    
    return rows as Pedido[];
  }
  
  async findById(id: number): Promise<Pedido | null> {
    const [rows] = await pool.query<Pedido[]>(
      `SELECT p.*, COUNT(i.id) as items_count
       FROM pedidos p
       LEFT JOIN pedido_items i ON p.id = i.pedido_id
       WHERE p.id = ?
       GROUP BY p.id`,
      [id]
    );
    
    return rows[0] || null;
  }
  
  async findItemsByPedidoId(pedidoId: number): Promise<PedidoItem[]> {
    const [rows] = await pool.query<PedidoItem[]>(
      'SELECT * FROM pedido_items WHERE pedido_id = ?',
      [pedidoId]
    );
    
    return rows;
  }
  
  async createPedido(pedido: PedidoDTO): Promise<Pedido> {
    // Inicia transação
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Gera número do pedido se não fornecido
      if (!pedido.numero) {
        const [countResult] = await connection.query('SELECT COUNT(*) as count FROM pedidos');
        const count = (countResult as any)[0].count + 1;
        pedido.numero = `PV-${count.toString().padStart(4, '0')}`;
      }
      
      // Insere pedido
      const [pedidoResult] = await connection.query(
        `INSERT INTO pedidos 
         (numero, data, cliente_id, valor_total, status, created_at, updated_at) 
         VALUES (?, ?, ?, 0, ?, NOW(), NOW())`,
        [
          pedido.numero,
          pedido.data,
          pedido.cliente_id,
          pedido.status || 'novo'
        ]
      );
      
      const pedidoId = (pedidoResult as any).insertId;
      
      // Insere itens
      let valorTotal = 0;
      
      for (const item of pedido.items) {
        const itemValorTotal = item.quantidade * item.valor_unitario;
        valorTotal += itemValorTotal;
        
        await connection.query(
          `INSERT INTO pedido_items
           (pedido_id, produto_id, descricao, quantidade, valor_unitario, valor_total, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            pedidoId,
            item.produto_id,
            item.descricao,
            item.quantidade,
            item.valor_unitario,
            itemValorTotal
          ]
        );
      }
      
      // Atualiza valor total do pedido
      await connection.query(
        'UPDATE pedidos SET valor_total = ? WHERE id = ?',
        [valorTotal, pedidoId]
      );
      
      await connection.commit();
      
      // Retorna pedido completo
      const pedidoCriado = await this.findById(pedidoId);
      
      if (!pedidoCriado) {
        throw new Error('Erro ao criar pedido');
      }
      
      return pedidoCriado;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  
  async updateStatus(id: number, status: Pedido['status']): Promise<Pedido | null> {
    await pool.query(
      'UPDATE pedidos SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, id]
    );
    
    return this.findById(id);
  }
  
  async delete(id: number): Promise<boolean> {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Remove itens
      await connection.query('DELETE FROM pedido_items WHERE pedido_id = ?', [id]);
      
      // Remove pedido
      const [result] = await connection.query('DELETE FROM pedidos WHERE id = ?', [id]);
      const deleted = (result as any).affectedRows > 0;
      
      await connection.commit();
      return deleted;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}
