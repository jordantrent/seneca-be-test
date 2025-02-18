import prisma from '../prisma/client';

export const getUsers = async () => {
    return prisma.user.findMany();
};

export const getUserById = async (userId: string) => {
    return prisma.user.findUnique({
        where: { userId: userId },
    });
};