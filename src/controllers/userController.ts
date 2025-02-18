import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error: any) {
        const message = error.message || 'An error occurred while fetching users';
        res.status(error.statusCode || 500).json({ error: message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error: any) {
        const message = error.message || 'An error occurred while fetching user';
        res.status(error.statusCode || 500).json({ error: message });
    }
};