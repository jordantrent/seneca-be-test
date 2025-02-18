import { Request, Response } from 'express';
import * as courseService from '../services/courseService';
import {getSessionsByCourseId} from "../services/courseService";

export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await courseService.getCourses();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching courses.' });
    }
};

export const getCourseById = async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId;
        const course = await courseService.getCourseById(courseId);
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
        } else {
            res.json(course);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the course.' });
    }
};

export const getSessionsByCourseIdHandler = async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.headers['userid'] as string;

        // if (userId) {
        //     const userExists = await userService.getUserById(userId);
        //     if (!userExists) {
        //         return res.status(404).json({ error: 'User not found' });
        //     }
        // }

        const courseWithSessions = await getSessionsByCourseId(courseId, userId);

        if (!courseWithSessions) {
            res.status(404).json({ error: 'Course not found' });
        } else{
            res.status(200).json(courseWithSessions.sessions);
        }

    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ error: 'An error occurred while fetching the course and sessions.' });
    }
};