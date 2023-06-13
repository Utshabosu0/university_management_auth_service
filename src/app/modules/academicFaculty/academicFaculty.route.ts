import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validations';
import { academicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.createFacultyZodSchema),
  academicFacultyController.createFaculty
);

router.get('/:id', academicFacultyController.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.updatefacultyZodSchema),
  academicFacultyController.updateFaculty
);

router.delete('/:id', academicFacultyController.deleteFaculty);

router.get('/', academicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
