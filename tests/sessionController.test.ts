import { Request, Response } from 'express';
import * as sessionService from '../src/services/sessionService';
import * as sessionController from '../src/controllers/sessionController';

jest.mock('../src/services/sessionService', () => ({
    createSession: jest.fn(),
    getSessionById: jest.fn(),
}));

describe('sessionController', () => {
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    beforeEach(() => {
        jest.clearAllMocks();

        mockResponse.status = statusMock;
        mockResponse.json = jsonMock;
    });

    describe('handleCreateSession', () => {
        test('should create a session successfully and return it', async () => {
            const mockSession = {
                sessionId: '1',
                timeStudied: 120,
                courseId: '1',
                userId: 'user1',
                totalModulesStudied: 10,
                averageScore: 85,
            };
            mockRequest.body = {
                timeStudied: 120,
                courseId: '1',
                totalModulesStudied: 10,
                averageScore: 85,
            };
            mockRequest.params = { courseId: '1' };
            mockRequest.headers = { userid: 'user1' };
            (sessionService.createSession as jest.Mock).mockResolvedValue(mockSession);

            await sessionController.handleCreateSession(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith(mockSession);
        });

        test('should return an error message when session creation fails', async () => {
            const mockError = new Error('Database error');
            mockRequest.body = {
                timeStudied: 120,
                courseId: '1',
                totalModulesStudied: 10,
                averageScore: 85,
            };
            mockRequest.headers = { userid: 'user1' };
            (sessionService.createSession as jest.Mock).mockRejectedValue(mockError);

            await sessionController.handleCreateSession(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Failed to create session' });
        });
    });

    describe('getSessionById', () => {
        test('should return a session by ID on success', async () => {
            const mockSession = {
                sessionId: '1',
                timeStudied: 120,
                courseId: '1',
                userId: 'user1',
                totalModulesStudied: 10,
                averageScore: 85,
            };
            mockRequest.params = { sessionId: '1' };
            (sessionService.getSessionById as jest.Mock).mockResolvedValue(mockSession);

            await sessionController.getSessionById(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockSession);
        });

        test('should return an error message if session is not found', async () => {
            const mockError = new Error('Session not found');
            mockRequest.params = { sessionId: '999' };
            (sessionService.getSessionById as jest.Mock).mockRejectedValue(mockError);

            await sessionController.getSessionById(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Session not found' });
        });

        test('should return a generic error message if error does not have a message', async () => {
            const mockError = new Error();
            mockRequest.params = { sessionId: '999' };
            (sessionService.getSessionById as jest.Mock).mockRejectedValue(mockError);

            await sessionController.getSessionById(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                error: 'An error occurred while fetching session',
            });
        });
    });
});
