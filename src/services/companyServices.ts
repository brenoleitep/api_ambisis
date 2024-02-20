import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { BadRequestsException } from '../exceptions/bad-requests';
import { ErroCode } from '../exceptions/root';
import { prisma } from '../server';

export async function createCompany(request: Request, response: Response, next: NextFunction) {
  try {
    const { razao_social, cnpj, cep, cidade, estado, bairro, complemento } = request.body;
    const companyExist = await prisma.empresa.findUnique({ where: { cnpj } });
    
    if (companyExist) {
      throw new BadRequestsException('Empresa já existe!', ErroCode.COMPANY_ALREADY_EXISTS);
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

    return response.status(httpStatus.CREATED).json({ data: company });
  } catch (error) {
    next(error);
  }
}

export async function listCompany(request: Request, response: Response, next: NextFunction) {
  try {
    const companies = await prisma.empresa.findMany();

    if (!companies || companies.length === 0) {
      throw new BadRequestsException('Empresas não listadas', ErroCode.COMPANY_NOT_FOUND);
    }
    
    return response.status(httpStatus.OK).json({ data: companies });
  } catch (error) {
    next(error);
  }
}

export async function updateCompany(request: Request, response: Response, next: NextFunction) {
  try {
    const {razao_social, cnpj, cep, cidade, estado, bairro, complemento } = request.body;
    const { id } = request.params;

    const companyExist = await prisma.empresa.findUnique({ where: { id: Number(id) } });

    if (!companyExist) {
      throw new BadRequestsException('Empresa não encontrada', ErroCode.COMPANY_NOT_FOUND);
    }

    const updatedCompany = await prisma.empresa.update({
      where: { id: Number(id) },
      data: { razao_social, cnpj, cep, cidade, estado, bairro, complemento }
    });

    return response.status(httpStatus.OK).json({ data: updatedCompany });
  } catch (error) {
    next(error);
  }
}

export async function deleteCompany(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.params;

    const companyExist = await prisma.empresa.findUnique({ where: { id: Number(id) } });

    if (!companyExist) {
      throw new BadRequestsException('Empresa não encontrada', ErroCode.COMPANY_NOT_FOUND);
    }

    const company = await prisma.empresa.delete({ where: { id: Number(id) } });

    return response.status(httpStatus.OK).json({ data: company });
  } catch (error) {
    next(error);
  }
}
