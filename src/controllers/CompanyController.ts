import { Request, Response } from 'express';
import { prisma } from '../database';

export default {
  
  async createCompany(request: Request, response: Response) {

    try {
      const {razao_social, cnpj, cep, cidade, estado, bairro, complemento} = request.body;
      const companyExist = await prisma.empresa.findUnique({ where: { cnpj } });
    
      if (companyExist) {
        return response.status(400).json({
          message: 'Erro: Empresa já cadastrada com este CNPJ.'
        });
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

      return response.status(200).json({
        message: 'Sucesso: Empresa criada com sucesso!',
        data: company
      });
    } catch (error) {
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async listCompany(request: Request, response: Response) {
    try {
      const companies = await prisma.empresa.findMany();

      if (!companies || companies.length === 0) {
        return response.status(400).json({
          message: 'Erro: Não existem empresas cadastradas.'
        });
      }
    
      return response.json({
        companies
      });

    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  },

  async updateCompany(request: Request, response: Response) {
    try {
      const { id, razao_social, cnpj, cep, cidade, estado, bairro, complemento } = request.body;

      const companyExist = await prisma.empresa.findUnique({ where: { id: Number(id) } });

      if (!companyExist) {
        return response.status(400).json({
          message: 'Erro: Empresa não encontrada.'
        });
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

    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async deleteCompany(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const companyExist = await prisma.empresa.findUnique({ where: { id: Number(id) } });

      if (!companyExist) {
        return response.json({
          message: 'Error: Empresa não encontrada!',
        });
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

    } catch (error) {
      return response.json({ message: error.message });
    }
  },
};


