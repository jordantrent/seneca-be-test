-- CreateTable
CREATE TABLE `Course` (
    `courseId` CHAR(36) NOT NULL,
    `courseName` VARCHAR(255) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`courseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `sessionId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `courseId` CHAR(36) NOT NULL,
    `totalModulesStudied` INTEGER NULL,
    `averageScore` DECIMAL(5, 2) NULL,
    `timeStudied` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `courseId`(`courseId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`sessionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userId` CHAR(36) NOT NULL,
    `firstName` VARCHAR(100) NULL,
    `lastName` VARCHAR(100) NULL,
    `email` VARCHAR(255) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
