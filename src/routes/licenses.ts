import { Router } from 'express';
import { createLicense, deleteLicense, listLicenses, updateLicense } from '../controllers/LicenseController';
import { errorHandler } from '../error-handler';

const licenseRouter = Router();

licenseRouter.post('/createLicense', errorHandler(createLicense));
licenseRouter.get('/listLicense', errorHandler(listLicenses));
licenseRouter.put('/updateLicense/:id', updateLicense);
licenseRouter.delete('/deleteLicense/:id', errorHandler(deleteLicense));

export default licenseRouter;