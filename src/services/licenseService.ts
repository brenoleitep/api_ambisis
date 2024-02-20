import { Empresa, LicencaAmbiental } from '@prisma/client';
import { Request } from 'express';
import { BadRequestsException } from '../exceptions/bad-requests';
import { ErroCode } from '../exceptions/root';
import { prisma } from '../server';

interface CreateLicenseData {
  empresaId: number;
  numero: string;
  orgao_ambiental: string;
  emissao: Date;
  validade: Date;
}

export async function createLicense(data: CreateLicenseData): Promise<LicencaAmbiental> {
  const { empresaId, numero, orgao_ambiental, emissao, validade } = data;

  const existingLicense = await prisma.licencaAmbiental.findFirst({
    where: {
      numero,
      empresaId,
    },
  });

  if (existingLicense) {
    throw new BadRequestsException('Já existe uma licença com esse número para essa empresa', ErroCode.DUPLICATE_LICENSE);
  }

  if (!numero || !orgao_ambiental || !emissao || !validade) {
    throw new BadRequestsException('Todos os campos devem ser preenchidos', ErroCode.INVALID_DATA);
  }

  const empresaExist: Empresa | null = await prisma.empresa.findUnique({ where: { id: empresaId } });
  if (!empresaExist) {
    throw new BadRequestsException('Empresa não existe', ErroCode.COMPANY_NOT_FOUND);
  }

  const emissaoDate = new Date(emissao);
  const validadeDate = new Date(validade);

  const license: LicencaAmbiental = await prisma.licencaAmbiental.create({
    data: {
      numero,
      orgao_ambiental,
      emissao: emissaoDate,
      validade: validadeDate,
      empresa: { connect: { id: empresaId } },
    }
  });

  return license;
}

export async function listLicenses(): Promise<LicencaAmbiental[]> {
  const licenses: LicencaAmbiental[] = await prisma.licencaAmbiental.findMany();
  if (!licenses || licenses.length === 0) {
    throw new BadRequestsException('Licença ambiental não encontrada', ErroCode.LICENSE_NOT_FOUND);
  }
  return licenses;
}

export async function updateLicense(request: Request): Promise<LicencaAmbiental> {
     
  const { numero, orgao_ambiental, validade } = request.body;

  const id = parseInt(request.params.id);


  const existingLicenseWithSameId: LicencaAmbiental | null = await prisma.licencaAmbiental.findUnique({
    where: { id } 
  });  if (!existingLicenseWithSameId) {
    throw new BadRequestsException('Licença ambiental não encontrada', ErroCode.LICENSE_NOT_FOUND);
  }

  if (existingLicenseWithSameId.id !== id) {
    throw new BadRequestsException('ID da licença inválido', ErroCode.INVALID_LICENSE_ID);
  }

  const licenseExist: LicencaAmbiental | null = await prisma.licencaAmbiental.findUnique({ where: { id } });
  if (!licenseExist) {
    throw new BadRequestsException('Licença ambiental não encontrada', ErroCode.LICENSE_NOT_FOUND);
  }

  const validadeDate = new Date(validade);

  const updatedLicense: LicencaAmbiental = await prisma.licencaAmbiental.update({
    where: { id: Number(id) },
    data: { numero, orgao_ambiental, validade: validadeDate }
  });

  return updatedLicense;
}

export async function deleteLicense(id: number): Promise<void> {
  const licenseExist: LicencaAmbiental | null = await prisma.licencaAmbiental.findUnique({ where: { id } });
  if (!licenseExist) {
    throw new BadRequestsException('Licença ambiental não encontrada', ErroCode.LICENSE_NOT_FOUND);
  }

  await prisma.licencaAmbiental.delete({ where: { id } });
}