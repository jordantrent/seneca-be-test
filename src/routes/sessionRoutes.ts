import { Router } from 'express';
import * as sessionController from '../controllers/sessionController';

const router = Router();

router.post('/sessions', sessionController.createSession);

router.get('/sessions/:sessionId', sessionController.getSessionById);

export default router;