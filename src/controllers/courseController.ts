import { Request, Response } from 'express';
import * as courseService from '../services/courseService';

export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await courseService.getCourses();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching courses.' });
    }
};