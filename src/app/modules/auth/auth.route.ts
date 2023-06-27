import express from 'express';
import { authValidation } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';
import { authController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginZodSchema),
  authController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenZodSchema),
  authController.refreshToken
);

export const AuthRoutes = router;
