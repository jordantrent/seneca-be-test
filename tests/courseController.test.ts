import { Request, Response } from 'express';
import * as courseService from '../src/services/courseService';
import * as courseController from '../src/controllers/courseController';

jest.mock('../src/services/courseService', () => ({
    getCourses: jest.fn(),
    getCourseById: jest.fn(),
    getSessionsByCourseId: jest.fn(),
}));

describe('courseController', () => {
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    beforeEach(() => {
        jest.clearAllMocks();

        mockResponse.status = statusMock;
        mockResponse.json = jsonMock;
    });

    describe('getCourses', () => {
        test('should return courses on success', async () => {
            const mockCourses = [{ courseId: '1', courseName: 'Test Course' }];
            (courseService.getCourses as jest.Mock).mockResolvedValue(mockCourses);

            await courseController.getCourses(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockCourses);
        });

        test('should return error message on failure', async () => {
            const mockError = new Error('Database error');
            (courseService.getCourses as jest.Mock).mockRejectedValue(mockError);

            await courseController.getCourses(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Database error' });
        });

        test('should return a generic error message if error does not have a message', async () => {
            const mockError = new Error();
            (courseService.getCourses as jest.Mock).mockRejectedValue(mockError);

            await courseController.getCourses(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                error: 'An error occurred while fetching courses',
            });
        });
    });

    describe('getCourseById', () => {
        test('should return course by ID on success', async () => {
            const mockCourse = { courseId: '1', courseName: 'Test Course' };
            mockRequest.params = { courseId: '1' };
            (courseService.getCourseById as jest.Mock).mockResolvedValue(mockCourse);

            await courseController.getCourseById(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockCourse);
        });

        test('should return error message if course not found', async () => {
            const mockError = new Error('Course not found');
            mockRequest.params = { courseId: '999' };
            (courseService.getCourseById as jest.Mock).mockRejectedValue(mockError);

            await courseController.getCourseById(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Course not found' });
        });

        test('should return a generic error message if error does not have a message', async () => {
            const mockError = new Error();
            mockRequest.params = { courseId: '999' };
            (courseService.getCourseById as jest.Mock).mockRejectedValue(mockError);

            await courseController.getCourseById(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                error: 'An error occurred while fetching course',
            });
        });
    });

    describe('getSessionsByCourseIdHandler', () => {
        test('should return sessions by course ID and user ID on success', async () => {
            const mockSessions = [{ sessionId: '1', userId: 'user1', totalModulesStudied: 10 }];
            mockRequest.params = { courseId: '1' };
            mockRequest.headers = { userid: 'user1' };
            (courseService.getSessionsByCourseId as jest.Mock).mockResolvedValue(mockSessions);

            await courseController.getSessionsByCourseIdHandler(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockSessions);
        });

        test('should return error message on failure', async () => {
            const mockError = new Error('Error fetching sessions');
            mockRequest.params = { courseId: '999' };
            mockRequest.headers = { userid: 'user1' };
            (courseService.getSessionsByCourseId as jest.Mock).mockRejectedValue(mockError);

            await courseController.getSessionsByCourseIdHandler(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Error fetching sessions' });
        });

        test('should return a generic error message if error does not have a message', async () => {
            const mockError = new Error();
            mockRequest.params = { courseId: '999' };
            mockRequest.headers = { userid: 'user1' };
            (courseService.getSessionsByCourseId as jest.Mock).mockRejectedValue(mockError);

            await courseController.getSessionsByCourseIdHandler(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                error: 'An error occurred while fetching stats',
            });
        });
    });
});
