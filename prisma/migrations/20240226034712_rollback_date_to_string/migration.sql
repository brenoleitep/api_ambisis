/*
  Warnings:

  - Changed the type of `emissao` on the `LicencaAmbiental` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `validade` on the `LicencaAmbiental` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "LicencaAmbiental" DROP COLUMN "emissao",
ADD COLUMN     "emissao" TIMESTAMP(3) NOT NULL,
DROP COLUMN "validade",
ADD COLUMN     "validade" TIMESTAMP(3) NOT NULL;
