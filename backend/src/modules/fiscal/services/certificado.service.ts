
import { pool } from '../../../config/database';

interface Certificado {
  id: number;
  nome: string;
  tipo: 'A1' | 'A3';
  caminho: string;
  senha: string;
  validade: Date;
  empresa_id: number;
  created_at: Date;
  updated_at: Date;
}

class CertificadoService {
  // Obter certificado digital da empresa
  async obterCertificado(empresaId: number): Promise<Certificado | null> {
    const [rows] = await pool.query(
      'SELECT * FROM certificados WHERE empresa_id = ? AND validade > NOW() ORDER BY created_at DESC LIMIT 1',
      [empresaId]
    );
    
    const certificados = rows as Certificado[];
    return certificados.length > 0 ? certificados[0] : null;
  }
  
  // Salvar certificado digital
  async salvarCertificado(certificadoData: any, empresaId: number): Promise<Certificado> {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Insere o certificado
      const [result] = await connection.query(
        `INSERT INTO certificados (
          nome, tipo, caminho, senha, validade, empresa_id
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          certificadoData.nome,
          certificadoData.tipo,
          certificadoData.caminho,
          certificadoData.senha,
          certificadoData.validade,
          empresaId
        ]
      );
      
      await connection.commit();
      
      const id = result.insertId;
      return { ...certificadoData, id, empresa_id: empresaId };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new CertificadoService();
