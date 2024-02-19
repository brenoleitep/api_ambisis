import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';

const companieRoutes = Router();

companieRoutes.post('/createCompany', CompanyController.createCompany);
companieRoutes.get('/listCompany', CompanyController.listCompany);
companieRoutes.put('/updateCompany/:id', CompanyController.updateCompany);
companieRoutes.delete('/deleteCompany/:id', CompanyController.deleteCompany);


export default companieRoutes;