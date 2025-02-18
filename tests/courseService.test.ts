import prisma from '../src/prisma/client';
import { getCourses, getCourseById, getSessionsByCourseId } from '../src/services/courseService';
import { getUserById } from '../src/services/userService';

jest.mock('../src/prisma/client', () => ({
    course: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
    },
    session: {
        findMany: jest.fn(),
    },
}));

jest.mock('../src/services/userService');

describe('courseService', () => {
    const mockFindMany = prisma.course.findMany as jest.Mock;
    const mockFindUnique = prisma.course.findUnique as jest.Mock;
    const mockGetUserById = getUserById as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getCourses should return courses', async () => {

        mockFindMany.mockResolvedValue([{ courseId: '1', courseName: 'Test Course' }]);

        const result = await getCourses();
        expect(result).toEqual([{ courseId: '1', courseName: 'Test Course' }]);
    });

    test('getCourseById should return a course', async () => {

        mockFindUnique.mockResolvedValue({ courseId: '1', courseName: 'Test Course' });

        const result = await getCourseById('1');
        expect(result).toEqual({ courseId: '1', courseName: 'Test Course' });
    });

    test('getCourseById should throw an error if course is not found', async () => {
        mockFindUnique.mockResolvedValue(null);

        await expect(getCourseById('999')).rejects.toThrow('Course not found');
    });

    test('getSessionsByCourseId should return sessions when userId is provided', async () => {
        const mockSessions = [
            { sessionId: '1', userId: 'user1', totalModulesStudied: 10, averageScore: 90.5, timeStudied: 120 }
        ];
        mockGetUserById.mockResolvedValue({ userId: 'user1' });
        mockFindUnique.mockResolvedValue({
            courseId: '1',
            courseName: 'Test Course',
            sessions: mockSessions,
        });

        const result = await getSessionsByCourseId('1', 'user1');
        expect(result).toEqual({
            courseId: '1',
            courseName: 'Test Course',
            sessions: mockSessions,
        });
        expect(mockGetUserById).toHaveBeenCalledWith('user1');
    });

    test('getSessionsByCourseId should return sessions without userId', async () => {
        const mockSessions = [
            { sessionId: '1', userId: 'user1', totalModulesStudied: 10, averageScore: 90.5, timeStudied: 120 }
        ];
        mockFindUnique.mockResolvedValue({
            courseId: '1',
            courseName: 'Test Course',
            sessions: mockSessions,
        });

        const result = await getSessionsByCourseId('1');
        expect(result).toEqual({
            courseId: '1',
            courseName: 'Test Course',
            sessions: mockSessions,
        });
        expect(mockGetUserById).not.toHaveBeenCalled();
    });

    test('getSessionsByCourseId should throw an error if course is not found', async () => {
        mockFindUnique.mockResolvedValue(null);

        await expect(getSessionsByCourseId('999', 'user1')).rejects.toThrow('Course not found');
    });
});
