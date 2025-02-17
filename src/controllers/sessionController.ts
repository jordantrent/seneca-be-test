import { Request, Response } from 'express';
import * as sessionService from '../services/sessionService';

export const createSession = async (req: Request, res: Response) => {
    try {
        const sessionData = req.body;
        const session = await sessionService.createSession(sessionData);
        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the session.' });
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
