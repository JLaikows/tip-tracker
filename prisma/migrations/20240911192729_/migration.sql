/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `loginAttempt` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "loginAttempt_phone_key" ON "loginAttempt"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");
