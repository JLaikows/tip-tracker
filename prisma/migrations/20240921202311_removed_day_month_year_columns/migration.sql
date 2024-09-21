/*
  Warnings:

  - You are about to drop the column `day` on the `payout` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `payout` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `payout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payout" DROP COLUMN "day",
DROP COLUMN "month",
DROP COLUMN "year";
