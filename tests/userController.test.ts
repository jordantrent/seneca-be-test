import { Request, Response } from 'express';
import * as userService from '../src/services/userService';
import * as userController from '../src/controllers/userController';

jest.mock('../src/services/userService', () => ({
    getUsers: jest.fn(),
    getUserById: jest.fn(),
}));

describe('userController', () => {
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    beforeEach(() => {
        jest.clearAllMocks();

        mockResponse.status = statusMock;
        mockResponse.json = jsonMock;
    });

    describe('getUsers', () => {
        test('should return users on success', async () => {
            const mockUsers = [{ userId: '1', userName: 'Test User' }];
            (userService.getUsers as jest.Mock).mockResolvedValue(mockUsers);

            await userController.getUsers(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockUsers);
        });

        test('should return error message on failure', async () => {
            const mockError = new Error('Database error');
            (userService.getUsers as jest.Mock).mockRejectedValue(mockError);

            await userController.getUsers(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Database error' });
        });

        test('should return a generic error message if error does not have a message', async () => {
            const mockError = new Error();
            (userService.getUsers as jest.Mock).mockRejectedValue(mockError);

            await userController.getUsers(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                error: 'An error occurred while fetching users',
            });
        });
    });

    describe('getUserById', () => {
        test('should return user by ID on success', async () => {
            const mockUser = { userId: '1', userName: 'Test User' };
            mockRequest.params = { userId: '1' };
            (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

            await userController.getUserById(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(mockUser);
        });

        test('should return error message if user not found', async () => {
            const mockError = new Error('User not found');
            mockRequest.params = { userId: '999' };
            (userService.getUserById as jest.Mock).mockRejectedValue(mockError);

            await userController.getUserById(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'User not found' });
        });

        test('should return a generic error message if error does not have a message', async () => {
            const mockError = new Error();
            mockRequest.params = { userId: '999' };
            (userService.getUserById as jest.Mock).mockRejectedValue(mockError);

            await userController.getUserById(mockRequest, mockResponse);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                error: 'An error occurred while fetching user',
            });
        });
    });
});
