
import { Router } from 'express';
import NFeController from './controllers/nfe.controller';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Rotas de NF-e
router.post('/nfe/emitir', NFeController.emitir);
router.post('/nfe/rascunho', NFeController.salvarRascunho);
router.post('/nfe/:id/cancelar', NFeController.cancelar);
router.get('/nfe/:id', NFeController.consultarPorId);
router.get('/nfe', NFeController.listar);
router.get('/nfe/:id/danfe', NFeController.gerarDANFE);

export default router;
