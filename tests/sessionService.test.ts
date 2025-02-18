import prisma from '../src/prisma/client';
import {createSession, getSessionById } from '../src/services/sessionService';

jest.mock('../src/prisma/client', () => ({
    session: {
        findUnique: jest.fn(),
        create: jest.fn(),
    },
}));

describe('sessionService', () => {
    const mockFindUnique = prisma.session.findUnique as jest.Mock;
    const mockCreate = prisma.session.create as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('createSession should successfully create a session', async () => {
        const mockSessionData = {
            timeStudied: 120,
            courseId: '1',
            userId: 'user1',
            totalModulesStudied: 10,
            averageScore: 85,
        };

        const mockCreatedSession = {
            sessionId: '1',
            ...mockSessionData,
        };

        mockCreate.mockResolvedValue(mockCreatedSession);

        const result = await createSession(mockSessionData);

        expect(mockCreate).toHaveBeenCalledWith({
            data: mockSessionData,
        });

        expect(result).toEqual(mockCreatedSession);
    });

    test('createSession should throw an error if creation fails', async () => {
        const mockSessionData = {
            timeStudied: 120,
            courseId: '1',
            userId: 'user1',
            totalModulesStudied: 10,
            averageScore: 85,
        };

        mockCreate.mockRejectedValue(new Error('Database error'));

        await expect(createSession(mockSessionData)).rejects.toThrow('Database error');
    });

    test('getSessionById should return a session', async () => {

        mockFindUnique.mockResolvedValue({ sessionId: '1', sessionName: 'Test Session' });

        const result = await getSessionById('1');
        expect(result).toEqual({ sessionId: '1', sessionName: 'Test Session' });
    });

    test('getSessionById should throw an error if session is not found', async () => {
        mockFindUnique.mockResolvedValue(null);

        await expect(getSessionById('999')).rejects.toThrow('Session not found');
    });

});
