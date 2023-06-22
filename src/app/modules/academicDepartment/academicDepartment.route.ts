import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validations';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(academicDepartmentValidation.createDepartmentZodSchema),
  academicDepartmentController.createAcademicDepartment
);

router.get('/:id', academicDepartmentController.getSingleAcademicDepartment);

router.patch(
  '/:id',
  validateRequest(academicDepartmentValidation.updateDepartmentZodSchema),
  academicDepartmentController.updateAcademicDepartment
);

router.delete('/:id', academicDepartmentController.deleteAcademicDepartment);

router.get('/', academicDepartmentController.getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router;
