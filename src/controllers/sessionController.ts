import { Request, Response } from 'express';
import * as sessionService from '../services/sessionService';
import {createSession} from "../services/sessionService";

export const handleCreateSession = async (req: Request, res: Response) => {
    const { timeStudied, totalModulesStudied, averageScore } = req.body;
    const courseId = req.params.courseId;
    const userId = req.headers['userid'] as string;

    try {
        const session = await createSession({
            timeStudied,
            courseId,
            userId,
            totalModulesStudied,
            averageScore,
        });
        res.status(201).json(session);
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Failed to create session' });
    }
};

export const getSessionById = async (req: Request, res: Response) => {
    try {
        const sessionId = req.params.sessionId;
        const session = await sessionService.getSessionById(sessionId);
        res.status(200).json(session);
    } catch (error: any) {
        const message = error.message || 'An error occurred while fetching session';
        res.status(error.statusCode || 500).json({ error: message });
    }
};
