import prisma from '../src/prisma/client';
import { getUsers, getUserById} from '../src/services/userService';

jest.mock('../src/prisma/client', () => ({
    user: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
    },
}));

describe('userService', () => {
    const mockFindMany = prisma.user.findMany as jest.Mock;
    const mockFindUnique = prisma.user.findUnique as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getUsers should return users', async () => {

        mockFindMany.mockResolvedValue([{ userId: '1', userName: 'Test User' }]);

        const result = await getUsers();
        expect(result).toEqual([{ userId: '1', userName: 'Test User' }]);
    });

    test('getUserById should return a user', async () => {

        mockFindUnique.mockResolvedValue({ userId: '1', userName: 'Test User' });

        const result = await getUserById('1');
        expect(result).toEqual({ userId: '1', userName: 'Test User' });
    });

    test('getUserById should throw an error if course is not found', async () => {
        mockFindUnique.mockResolvedValue(null);

        await expect(getUserById('999')).rejects.toThrow('User not found');
    });

});
