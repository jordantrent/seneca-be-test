import prisma from '../src/prisma/client';
import { createSession, getSessionById } from '../src/services/sessionService';

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
            averageScore: 85.0,
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
            averageScore: 85.0,
        };

        mockCreate.mockRejectedValue(new Error('Database error'));

        await expect(createSession(mockSessionData)).rejects.toThrow('Database error');
    });

    test('getSessionById should return session details when valid sessionId, courseId, and userId are provided', async () => {
        const mockSession = {
            sessionId: '1',
            courseId: '1',
            userId: 'user1',
            averageScore: 85.0,
            timeStudied: 120,
            totalModulesStudied: 10,
        };

        mockFindUnique.mockResolvedValue(mockSession);

        const result = await getSessionById('1', '1', 'user1');

        expect(mockFindUnique).toHaveBeenCalledWith({
            where: { sessionId: '1' },
        });

        expect(result).toEqual({
            sessionId: '1',
            averageScore: 85.0,
            timeStudied: 120,
            totalModulesStudied: 10,
        });
    });

    test('getSessionById should throw an error if session is not found', async () => {
        mockFindUnique.mockResolvedValue(null);

        await expect(getSessionById('999', '1', 'user1')).rejects.toThrow('Session not found');
    });

    test('getSessionById should throw an error if courseId does not match', async () => {
        const mockSession = {
            sessionId: '1',
            courseId: '1',
            userId: 'user1',
            averageScore: 85.0,
            timeStudied: 120,
            totalModulesStudied: 10,
        };

        mockFindUnique.mockResolvedValue(mockSession);

        await expect(getSessionById('1', '2', 'user1')).rejects.toThrow('Unauthorized: Course ID does not match.');
    });

    test('getSessionById should throw an error if userId does not match', async () => {
        const mockSession = {
            sessionId: '1',
            courseId: '1',
            userId: 'user1',
            averageScore: 85.0,
            timeStudied: 120,
            totalModulesStudied: 10,
        };

        mockFindUnique.mockResolvedValue(mockSession);

        await expect(getSessionById('1', '1', 'user2')).rejects.toThrow('Unauthorized: User ID does not match.');
    });
});
