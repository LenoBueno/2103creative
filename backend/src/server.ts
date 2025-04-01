
import app from './app';
import { env } from './config/env';
import { testConnection } from './config/database';

const PORT = env.API_PORT || 3001;

// Testa conexão com banco antes de iniciar servidor
const startServer = async () => {
  try {
    // Verifica conexão com o banco
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Falha ao conectar ao banco de dados. Encerrando aplicação');
      process.exit(1);
    }
    
    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();
