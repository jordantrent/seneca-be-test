import { Router } from 'express';
import * as courseController from '../controllers/courseController';

const router = Router();

router.get('/courses', courseController.getCourses);

export default router;