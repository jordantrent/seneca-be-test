import { Router } from 'express';
import * as sessionController from '../controllers/sessionController';

const router = Router();

router.post('/courses/:courseId', sessionController.handleCreateSession);
router.get('/sessions/:sessionId', sessionController.getSessionById);

export default router;