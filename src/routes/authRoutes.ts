import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();

router.post('/cadastro', AuthController.register);
router.post('/login', AuthController.login);

export default router;
