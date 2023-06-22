import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
);

router.get('/:id', AcademicSemesterController.getSingleAcademicSemester);

router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateAcademicSemester
);

router.delete('/:id', AcademicSemesterController.deleteAcademicSemester);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);

export const AcademicSemesterRoutes = router;
