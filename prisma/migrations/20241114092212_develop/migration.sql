/*
  Warnings:

  - You are about to drop the column `isEditabled` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "isEditabled",
ADD COLUMN     "isEditable" BOOLEAN NOT NULL DEFAULT false;
