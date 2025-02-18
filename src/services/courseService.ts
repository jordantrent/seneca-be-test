import prisma from '../prisma/client';
import {getUserById} from "./userService";

export const getCourses = async () => {
    const courses = await prisma.course.findMany();
    if (courses.length === 0) {
        throw new Error('No courses found');
    }
    return courses;
};

export const getCourseLifetimeStatsById = async (courseId: string, userId: string) => {
    const courseData = await getSessionsByCourseId(courseId, userId);
    const sessions = courseData?.sessions;

    if (!sessions) {
        throw new Error('No sessions found for this course');
    }

    const totalTimeStudied = sessions.reduce((total, session) => total + (session.timeStudied ? session.timeStudied.valueOf() : 0), 0);
    const totalModulesStudied = sessions.reduce((total, session) => total + (session.totalModulesStudied ? session.totalModulesStudied.valueOf() : 0), 0);

    const averageScore = sessions
        .filter((session) => session.averageScore !== null)
        .reduce((total, session) => total + (session.averageScore || 0), 0) / sessions.length;

    return {
        totalTimeStudied,
        totalModulesStudied,
        averageScore,
    };
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