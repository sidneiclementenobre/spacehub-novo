import { Router } from 'express';
import { SpaceController } from '../controllers/spaceController';

const router = Router();

router.get('/imoveis', SpaceController.listSpaces);
router.post('/imoveis', SpaceController.createSpace);

export default router;
