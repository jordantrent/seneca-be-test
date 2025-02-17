import { Request, Response } from 'express';
import * as sessionService from '../services/sessionService';
import {createSession} from "../services/sessionService";

export const handleCreateSession = async (req: Request, res: Response) => {
    const { timeStudied, courseId, totalModulesStudied, averageScore } = req.body;
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
        if (!session) {
            res.status(404).json({ error: 'Session not found' });
        } else {
            res.json(session);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the session.' });
    }
};
