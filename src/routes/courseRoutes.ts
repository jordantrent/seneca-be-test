import { Router } from 'express';
import * as courseController from '../controllers/courseController';

const router = Router();

router.get('/courses', courseController.getCourses);
router.get('/courses/:courseId', courseController.getCourseLifetimeStatsById);
router.get('/courses/sessions/:courseId/', courseController.getSessionsByCourseIdHandler);

export default router;