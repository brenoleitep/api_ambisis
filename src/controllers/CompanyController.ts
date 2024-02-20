import { NextFunction, Request, Response } from 'express';
import { BadRequestsException } from '../exceptions/bad-requests';
import { ErroCode } from '../exceptions/root';
import { prisma } from '../server';

export default {
  
  async createCompany(request: Request, response: Response, next: NextFunction) {

    const {razao_social, cnpj, cep, cidade, estado, bairro, complemento} = request.body;
    const companyExist = await prisma.empresa.findUnique({ where: { cnpj } });
    
    if (companyExist) {
      next(new BadRequestsException('Empresa já existe', ErroCode.COMPANY_ALREADY_EXISTS));
    }

    const company = await prisma.empresa.create({
      data: {
        cnpj, 
        razao_social,
        bairro,
        cep,
        cidade,
        complemento,
        estado,
        
      }
    });

    return response.json({
      message: 'Empresa criada com sucesso!',
      data: company
    });
  },

  async listCompany(request: Request, response: Response, next: NextFunction) {

    const companies = await prisma.empresa.findMany();

    if (!companies || companies.length === 0) {
      next(new BadRequestsException('Empresas não listadas', ErroCode.COMPANY_NOT_FOUND));
    }
    
    return response.json({
      companies
    });

  },

  async updateCompany(request: Request, response: Response, next: NextFunction) {
    const { id, razao_social, cnpj, cep, cidade, estado, bairro, complemento } = request.body;

    const companyExist = await prisma.empresa.findUnique({ where: { id: Number(id) } });

    if (!companyExist) {
      next(new BadRequestsException('Empresa não encontrada', ErroCode.COMPANY_NOT_FOUND));
      
    }

    const updatedCompany = await prisma.empresa.update({
      where: {
        id: Number(id)
      },
      data: {
        razao_social,
        cnpj,
        cep,
        cidade,
        estado,
        bairro,
        complemento
      }
    });

    return response.json({
      message: 'Empresa atualizada com sucesso!',
      updatedCompany
    });

  },

  async deleteCompany(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const companyExist = await prisma.empresa.findUnique({ where: { id: Number(id) } });

    if (!companyExist) {
      next(new BadRequestsException('Empresa não encontrada', ErroCode.COMPANY_NOT_FOUND));
    }

    const company = await prisma.empresa.delete({
      where: {
        id: Number(request.params.id)
      },
    });

    return response.json({
      message: 'Empresa deletada com sucesso!',
      company
    });

  },
};


