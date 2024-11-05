/*
  Warnings:

  - You are about to drop the column `date` on the `unpaidPayout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "unpaidPayout" DROP COLUMN "date",
ADD COLUMN     "due" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
