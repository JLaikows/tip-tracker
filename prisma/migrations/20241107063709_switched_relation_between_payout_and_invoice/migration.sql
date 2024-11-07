/*
  Warnings:

  - A unique constraint covering the columns `[invoiceId]` on the table `payout` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "invoice" DROP CONSTRAINT "invoice_payoutId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "payout_invoiceId_key" ON "payout"("invoiceId");

-- AddForeignKey
ALTER TABLE "payout" ADD CONSTRAINT "payout_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
