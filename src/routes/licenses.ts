import { Router } from 'express';
import LicenseController from '../controllers/LicenseController';

const licenseRouter = Router();

licenseRouter.post('/createLicense', LicenseController.createLicense);
licenseRouter.get('/listLicense', LicenseController.listLicenses);
licenseRouter.put('/updateLicense/:id', LicenseController.updateLicense);
licenseRouter.delete('/deleteLicense/:id', LicenseController.deleteLicense);

export default licenseRouter;