
import mysql from 'mysql2/promise';
import { env } from './env';

// Cria pool de conexões MySQL
const pool = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testa a conexão
const testConnection = async (): Promise<boolean> => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexão com o banco de dados estabelecida');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Falha na conexão com o banco de dados:', error);
    return false;
  }
};

export { pool, testConnection };
