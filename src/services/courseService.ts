import prisma from '../prisma/client';

export const getCourses = async () => {
    return prisma.course.findMany();
};

export const getCourseById = async (courseId: string) => {
    return prisma.course.findUnique({
        where: { courseId: courseId },
    });
};

export const getSessionsByCourseId = async (courseId: string) => {
    return prisma.course.findUnique({
        where: { courseId: courseId },
        include: {
            sessions: true,
        },
    });
};
