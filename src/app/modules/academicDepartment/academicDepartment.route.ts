import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validations';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(academicDepartmentValidation.createDepartmentZodSchema),
  academicDepartmentController.createDepartment
);

router.get('/:id', academicDepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  validateRequest(academicDepartmentValidation.updateDepartmentZodSchema),
  academicDepartmentController.updateDepartment
);

router.delete('/:id', academicDepartmentController.deleteDepartment);

router.get('/', academicDepartmentController.getAllDepartments);

export const AcademicDepartmentRoutes = router;
