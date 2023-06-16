import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidaion } from './student.validation';

const router = express.Router();

router.get('/:id', studentController.getSingleStudent);

router.patch(
  '/:id',
  validateRequest(studentValidaion.updateStudentZodSchema),
  studentController.updateStudent
);

router.delete('/:id', studentController.deleteStudent);

router.get('/', studentController.getAllStudents);

export const StudentRoutes = router;
