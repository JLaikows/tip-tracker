-- CreateTable
CREATE TABLE "unpaidPayout" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "taxable" BOOLEAN NOT NULL DEFAULT false,
    "payed" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "payoutId" INTEGER,

    CONSTRAINT "unpaidPayout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unpaidPayout_payoutId_key" ON "unpaidPayout"("payoutId");

-- AddForeignKey
ALTER TABLE "unpaidPayout" ADD CONSTRAINT "unpaidPayout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unpaidPayout" ADD CONSTRAINT "unpaidPayout_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unpaidPayout" ADD CONSTRAINT "unpaidPayout_payoutId_fkey" FOREIGN KEY ("payoutId") REFERENCES "payout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
