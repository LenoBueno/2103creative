
import { Router } from 'express';
import { LancamentoController } from './controllers/lancamento.controller';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();
const lancamentoController = new LancamentoController();

// Rotas protegidas
router.use(authMiddleware);

// Lançamentos contábeis
router.get('/lancamentos', lancamentoController.listarLancamentos);
router.get('/lancamentos/:id', lancamentoController.obterLancamento);
router.post('/lancamentos', lancamentoController.criarLancamento);
router.put('/lancamentos/:id', lancamentoController.atualizarLancamento);
router.delete('/lancamentos/:id', lancamentoController.excluirLancamento);

export default router;
