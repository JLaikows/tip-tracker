/*
  Warnings:

  - You are about to drop the column `client` on the `payout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payout" DROP COLUMN "client",
ADD COLUMN     "clientId" INTEGER;

-- AddForeignKey
ALTER TABLE "payout" ADD CONSTRAINT "payout_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
