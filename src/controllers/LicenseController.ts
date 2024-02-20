import { NextFunction, Request, Response } from 'express';
import * as licenseService from '../services/licenseService';

export async function createLicense(request: Request, response: Response, next: NextFunction) {
  try {
    const license = await licenseService.createLicense(request.body);
    return response.status(201).json({ data: license });
  } catch (error) {
    next(error);
  }
}

export async function listLicenses(request: Request, response: Response, next: NextFunction) {
  try {
    const licenses = await licenseService.listLicenses();
    return response.status(200).json({ data: licenses });
  } catch (error) {
    next(error);
  }
}

export async function updateLicense(request: Request, response: Response, next: NextFunction) {
  try {
    const updatedLicense = await licenseService.updateLicense(request); 
    return response.status(200).json({ data: updatedLicense });
  } catch (error) {
    next(error);
  }
}

export async function deleteLicense(request: Request, response: Response, next: NextFunction) {
  try {
    const id = parseInt(request.params.id); 
    await licenseService.deleteLicense(id); 
    return response.status(200).json({ message: 'Licença ambiental deletada com sucesso!' });
  } catch (error) {
    next(error);
  }
}