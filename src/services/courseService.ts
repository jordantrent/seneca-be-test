import prisma from '../prisma/client';

export const getCourses = async () => {
    return prisma.courses.findMany();
};