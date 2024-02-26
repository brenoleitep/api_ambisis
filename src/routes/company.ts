import { Router } from 'express';
import { createCompany, deleteCompany, listCompany, updateCompany } from '../controllers/CompanyController';
import { errorHandler } from '../error-handler';

const companyRoutes = Router();

companyRoutes.post('/createCompany', errorHandler(createCompany));
companyRoutes.get('/listCompany', errorHandler(listCompany));
companyRoutes.put('/updateCompany/:id', errorHandler(updateCompany));
companyRoutes.delete('/deleteCompany/:id', deleteCompany);


export default companyRoutes;