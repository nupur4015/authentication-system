/*
  Warnings:

  - The values [VERIFY_EMAIL] on the enum `TokenType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `isEmailVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TokenType_new" AS ENUM ('ACCESS', 'REFRESH', 'RESET_PASSWORD');
ALTER TABLE "Token" ALTER COLUMN "type" TYPE "TokenType_new" USING ("type"::text::"TokenType_new");
ALTER TYPE "TokenType" RENAME TO "TokenType_old";
ALTER TYPE "TokenType_new" RENAME TO "TokenType";
DROP TYPE "TokenType_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isEmailVerified",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "photo" TEXT;
