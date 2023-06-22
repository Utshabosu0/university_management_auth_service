import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/:id', facultyController.getSingleFaculty);
router.get('/', facultyController.getAllFaculties);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  facultyController.updateFaculty
);

router.delete('/:id', facultyController.deleteFaculty);

export const FacultyRoutes = router;
