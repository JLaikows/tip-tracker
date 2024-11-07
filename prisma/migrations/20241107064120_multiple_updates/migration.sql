/*
  Warnings:

  - You are about to drop the column `payoutId` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `weekLabel` on the `invoice` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "invoice_payoutId_key";

-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "payoutId",
DROP COLUMN "weekLabel";
