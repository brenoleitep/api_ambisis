import { NextFunction, Request, Response } from 'express';
import * as companyService from '../services/companyServices';

export async function createCompany(request: Request, response: Response, next: NextFunction) {
  try {
    await companyService.createCompany(request, response, next);
  } catch (error) {
    next(error);
  }
}

export async function listCompany(request: Request, response: Response, next: NextFunction) {
  try {
    await companyService.listCompany(request, response, next);
  } catch (error) {
    next(error);
  }
}

export async function updateCompany(request: Request, response: Response, next: NextFunction) {
  try {
    await companyService.updateCompany(request, response, next);
  } catch (error) {
    next(error);
  }
}

export async function deleteCompany(request: Request, response: Response, next: NextFunction) {
  try {
    await companyService.deleteCompany(request, response, next);
  } catch (error) {
    next(error);
  }
}