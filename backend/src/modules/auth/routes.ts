
import { Router } from 'express';
import { AuthController } from './controllers/auth.controller';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/validate', authController.validateToken);
router.get('/profile', authMiddleware, authController.getProfile);

export default router;
