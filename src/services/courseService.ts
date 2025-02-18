import prisma from '../prisma/client';
import {getUserById} from "./userService";

export const getCourses = async () => {
    return prisma.course.findMany();
};

export const getCourseById = async (courseId: string) => {
    const course = await prisma.course.findUnique({
        where: { courseId: courseId },
    });

    if (!course) {
        throw new Error('Course not found');
    }

    return course;
};

export const getSessionsByCourseId = async (courseId: string, userId?: string) => {
    if (userId) {
        await getUserById(userId);

    }
    await getCourseById(courseId);

    return prisma.course.findUnique({
        where: { courseId: courseId },
        include: {
            sessions: {
                where: userId ? { userId: userId } : undefined,
            },
        },
    });

};