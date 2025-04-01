
import { z } from 'zod';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Schema de validação para variáveis de ambiente
const envSchema = z.object({
  // Configuração do Banco de Dados
  DB_HOST: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string().min(1),
  
  // Configuração do Servidor
  API_PORT: z.string().transform((val) => parseInt(val, 10)),
  
  // Configuração de Autenticação
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRATION: z.string(),
  
  // Configuração CORS
  CORS_ORIGIN: z.string(),
});

// Valida as variáveis de ambiente
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Variáveis de ambiente inválidas:', _env.error.format());
  throw new Error('Variáveis de ambiente inválidas');
}

// Exporta variáveis validadas
export const env = _env.data;
