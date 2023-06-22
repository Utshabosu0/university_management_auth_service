import express from 'express';
import { usersController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(userValidation.createStudentZodSchema),
  usersController.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(userValidation.createFacultyZodSchema),
  usersController.createFaculty
);

router.post(
  '/create-faculty',
  validateRequest(userValidation.createAdminZodSchema),
  usersController.createAdmin
);
export const UserRoutes = router;
