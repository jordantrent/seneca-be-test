import prisma from '../prisma/client';

export const getUsers = async () => {
    return prisma.user.findMany();
};

export const getUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { userId: userId },
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};