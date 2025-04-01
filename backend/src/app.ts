
import express from 'express';
import { configureMiddleware } from './config/middleware';
import { errorHandler } from './shared/middleware/error-handler';

// Rotas
import authRoutes from './modules/auth/routes';
import financeiroRoutes from './modules/financeiro/routes';
import vendasRoutes from './modules/vendas/routes';

// Inicializa o app Express
const app = express();

// Configura middlewares globais
configureMiddleware(app);

// Configura rotas
app.use('/api/auth', authRoutes);
app.use('/api/financeiro', financeiroRoutes);
app.use('/api/vendas', vendasRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Middleware de erro (deve ser o último)
app.use(errorHandler);

export default app;
