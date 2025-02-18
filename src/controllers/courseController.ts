import { Request, Response } from 'express';
import * as courseService from '../services/courseService';

export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await courseService.getCourses();
        res.status(200).json(courses);
    } catch (error: any) {
        const message = error.message || 'An error occurred while fetching courses';
        const statusCode = error.message === 'No courses found' ? 404 : error.statusCode || 500;
        res.status(statusCode).json({ error: message });
    }
};

export const getCourseLifetimeStatsById = async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const userId = req.headers['userid'] as string;
    try {
        const course = await courseService.getCourseLifetimeStatsById(courseId, userId);
        res.status(200).json(course);
    } catch (error: any) {
        const message = error.message || 'An error occurred while fetching course stats';
        const statusCode = error.message === 'No course sessions found' ? 404 : error.statusCode || 500;
        res.status(statusCode).json({ error: message });
    }
};

export const getCourseById = async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId;
        const course = await courseService.getCourseById(courseId);
        res.status(200).json(course);
    } catch (error: any) {
        const message = error.message || 'An error occurred while fetching course';
        const statusCode = error.message === 'No courses found' ? 404 : error.statusCode || 500;
        res.status(statusCode).json({ error: message });
    }
};

export const getSessionsByCourseIdHandler = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.headers['userid'] as string;

    try {
        const sessions = await courseService.getSessionsByCourseId(courseId, userId);
        res.status(200).json(sessions);
    } catch (error: any) {
        const message = error.message || 'An error occurred while fetching stats';
        res.status(error.statusCode || 500).json({ error: message });
    }
};