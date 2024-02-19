import { Request, Response } from 'express';
import { prisma } from '../server';

export default {
  async createLicense(request: Request, response: Response) {
    try {
      const { empresaId, numero, orgao_ambiental, emissao, validade } = request.body;

      const empresaExist = await prisma.empresa.findUnique({ where: { id: empresaId } });
      if (!empresaExist) {
        return response.status(400).json({ message: 'Empresa não encontrada' });
      }

      const license = await prisma.licencaAmbiental.create({
        data: {
          numero,
          orgao_ambiental,
          emissao,
          validade,
          empresa: { connect: { id: empresaId } } // Conecte a licença à empresa correspondente
        }
      });

      return response.json({ message: 'Licença ambiental criada com sucesso!', data: license });
    } catch (error) {
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async listLicenses(request: Request, response: Response) {
    try {
      const licenses = await prisma.licencaAmbiental.findMany();
      if (!licenses || licenses.length === 0) {
        return response.status(400).json({ message: 'Licenças ambientais não encontradas' });
      }
      return response.json({ licenses });
    } catch (error) {
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async updateLicense(request: Request, response: Response) {
    try {
      const { id, numero, orgao_ambiental, emissao, validade } = request.body;

      const licenseExist = await prisma.licencaAmbiental.findUnique({ where: { id: Number(id) } });
      if (!licenseExist) {
        return response.status(400).json({ message: 'Licença não encontrada' });
      }

      const updatedLicense = await prisma.licencaAmbiental.update({
        where: { id: Number(id) },
        data: { numero, orgao_ambiental, emissao, validade }
      });

      return response.json({ message: 'Licença ambiental atualizada com sucesso!', data: updatedLicense });
    } catch (error) {
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async deleteLicense(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const licenseExist = await prisma.licencaAmbiental.findUnique({ where: { id: Number(id) } });
      if (!licenseExist) {
        return response.status(400).json({ message: 'Licença não encontrada' });
      }

      await prisma.licencaAmbiental.delete({ where: { id: Number(id) } });

      return response.json({ message: 'Licença ambiental deletada com sucesso!' });
    } catch (error) {
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};
