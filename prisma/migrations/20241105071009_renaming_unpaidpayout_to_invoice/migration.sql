/*
  Warnings:

  - You are about to drop the `unpaidPayout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "unpaidPayout" DROP CONSTRAINT "unpaidPayout_clientId_fkey";

-- DropForeignKey
ALTER TABLE "unpaidPayout" DROP CONSTRAINT "unpaidPayout_payoutId_fkey";

-- DropForeignKey
ALTER TABLE "unpaidPayout" DROP CONSTRAINT "unpaidPayout_userId_fkey";

-- DropTable
DROP TABLE "unpaidPayout";

-- CreateTable
CREATE TABLE "invoice" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "taxable" BOOLEAN NOT NULL DEFAULT false,
    "payed" BOOLEAN NOT NULL DEFAULT false,
    "due" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weekLabel" TEXT,
    "userId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "payoutId" INTEGER,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoice_payoutId_key" ON "invoice"("payoutId");

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_payoutId_fkey" FOREIGN KEY ("payoutId") REFERENCES "payout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
