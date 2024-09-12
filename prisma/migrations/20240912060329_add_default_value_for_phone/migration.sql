-- DropIndex
DROP INDEX "user_phone_key";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "phone" SET DEFAULT '';
