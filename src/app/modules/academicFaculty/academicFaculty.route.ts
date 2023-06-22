import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validations';
import { academicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.createFacultyZodSchema),
  academicFacultyController.createAcademicFaculty
);

router.get('/:id', academicFacultyController.getSingleAcademicFaculty);

router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.updatefacultyZodSchema),
  academicFacultyController.updateAcademicFaculty
);

router.delete('/:id', academicFacultyController.deleteAcademicFaculty);

router.get('/', academicFacultyController.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;
