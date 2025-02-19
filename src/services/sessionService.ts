import prisma from '../prisma/client';

export const createSession = async (sessionData: {
    timeStudied: number;
    courseId: string;
    userId: string;
    totalModulesStudied: number;
    averageScore: number;
}) => {

    const session = await prisma.session.create({
        data: {
            timeStudied: sessionData.timeStudied,
            courseId: sessionData.courseId,
            userId: sessionData.userId,
            totalModulesStudied: sessionData.totalModulesStudied,
            averageScore: sessionData.averageScore,
        },
    });

    console.log('Created session with Id:', session.sessionId);

    return session;
};


export const getSessionById = async (sessionId: string, courseId: string, userId: string) => {
    const session = await prisma.session.findUnique({
        where: { sessionId: sessionId },
    });

    if (!session) {
        throw new Error("Session not found.");
    }

    if (session.courseId !== courseId) {
        throw new Error("Unauthorized: Course ID does not match.");
    }

    if (session.userId !== userId) {
        throw new Error("Unauthorized: User ID does not match.");
    }

    const { averageScore, timeStudied, totalModulesStudied } = session;
    return { sessionId, averageScore, timeStudied, totalModulesStudied };
};
