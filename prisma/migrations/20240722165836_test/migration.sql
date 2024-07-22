/*
  Warnings:

  - You are about to drop the column `district` on the `user_account` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `user_account` table. All the data in the column will be lost.
  - You are about to drop the column `ward` on the `user_account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `district_ward_account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user_account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."district_ward_account" ALTER COLUMN "passwd" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "public"."user_account" DROP COLUMN "district",
DROP COLUMN "province",
DROP COLUMN "ward",
ADD COLUMN     "district_code" CHAR(5),
ADD COLUMN     "province_code" CHAR(5),
ADD COLUMN     "ward_code" CHAR(5),
ALTER COLUMN "passwd" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "district_ward_account_username_key" ON "public"."district_ward_account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_account_username_key" ON "public"."user_account"("username");
