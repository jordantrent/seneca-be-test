import prisma from '../prisma/client';

export const getCourses = async () => {
    return prisma.course.findMany();
};