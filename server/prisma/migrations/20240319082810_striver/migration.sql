-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `stdInput` VARCHAR(191) NOT NULL,
    `sourceCode` VARCHAR(10000) NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
