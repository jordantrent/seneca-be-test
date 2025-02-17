import prisma from '../prisma/client';

export const createSession = async (sessionData: { sessionId: string; timeStudied: number; courseId: string }) => {
    return prisma.sessions.create({
        data: {
            sessionId: sessionData.sessionId,
            timeStudied: sessionData.timeStudied,
            courseId: sessionData.courseId,
        },
    });
};

export const getSessionById = async (sessionId: string) => {
    return prisma.sessions.findUnique({
        where: { sessionId: sessionId },
    });
};
