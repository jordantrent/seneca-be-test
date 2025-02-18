import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.getUserById);

export default router;