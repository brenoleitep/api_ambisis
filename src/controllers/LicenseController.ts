import { NextFunction, Request, Response } from 'express';
import { BadRequestsException } from '../exceptions/bad-requests';
import { ErroCode } from '../exceptions/root';
import { prisma } from '../server';

export default {
  async createLicense(request: Request, response: Response, next: NextFunction) {
    const { empresaId, numero, orgao_ambiental, emissao, validade } = request.body;

    const empresaExist = await prisma.empresa.findUnique({ where: { id: empresaId } });
    if (!empresaExist) {
      next(new BadRequestsException('Licenças ambientais não encontradas', ErroCode.LICENSE_NOT_FOUND));
    }

    const license = await prisma.licencaAmbiental.create({
      data: {
        numero,
        orgao_ambiental,
        emissao,
        validade,
        empresa: { connect: { id: empresaId } }
      }
    });

    return response.json({ message: 'Licença ambiental criada com sucesso!', data: license });
  },

  async listLicenses(request: Request, response: Response, next: NextFunction) {

    const licenses = await prisma.licencaAmbiental.findMany();
    if (!licenses || licenses.length === 0) {
      next(new BadRequestsException('Licenças ambientais não encontradas', ErroCode.LICENSE_NOT_FOUND));
    }
    return response.json({ licenses });
  },

  async updateLicense(request: Request, response: Response, next: NextFunction) {

    const { id, numero, orgao_ambiental, emissao, validade } = request.body;

    const licenseExist = await prisma.licencaAmbiental.findUnique({ where: { id: Number(id) } });
    if (!licenseExist) {
      next(new BadRequestsException('Licenças ambientais não encontradas', ErroCode.LICENSE_NOT_FOUND));
    }

    const updatedLicense = await prisma.licencaAmbiental.update({
      where: { id: Number(id) },
      data: { numero, orgao_ambiental, emissao, validade }
    });

    return response.json({ message: 'Licença ambiental atualizada com sucesso!', data: updatedLicense });

  },

  async deleteLicense(request: Request, response: Response, next: NextFunction) {

    const { id } = request.params;
    const licenseExist = await prisma.licencaAmbiental.findUnique({ where: { id: Number(id) } });

    if (!licenseExist) {
      next(new BadRequestsException('Licenças ambientais não encontradas', ErroCode.LICENSE_NOT_FOUND));
    }

    await prisma.licencaAmbiental.delete({ where: { id: Number(id) } });

    return response.json({ message: 'Licença ambiental deletada com sucesso!' });
  }
};
