import { Router } from 'express';
import * as courseController from '../controllers/courseController';

const router = Router();

router.get('/courses', courseController.getCourses);
router.get('/courses/:courseId', courseController.getCourseById);
router.get('/courses/sessions/:courseId/', courseController.getSessionsByCourseIdHandler);

export default router;