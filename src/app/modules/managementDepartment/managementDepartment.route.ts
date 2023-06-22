import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { managementDepartmentController } from './managementDepartment.controller';
import { managementDepartmentValidation } from './managementDepartment.validations';

const router = express.Router();

router.post(
  '/create-managementDepartment',
  validateRequest(
    managementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  managementDepartmentController.createManagementDepartment
);

router.get(
  '/:id',
  managementDepartmentController.getSingleManagementDepartment
);

router.patch(
  '/:id',
  validateRequest(
    managementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  managementDepartmentController.updateManagementDepartment
);

router.delete(
  '/:id',
  managementDepartmentController.deleteManagementDepartment
);

router.get('/', managementDepartmentController.getAllManagementDepartments);

export const ManagementDepartmentRoutes = router;
