/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Empresa_cnpj_key` ON `Empresa`(`cnpj`);
