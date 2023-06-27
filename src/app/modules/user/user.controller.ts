import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';

import { userService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // const { user } = req.body;
    // const user = req.body;
    const { student, ...userData } = req.body;
    const result = await userService.createStudent(student, userData);

    // res.status(200).json({
    //   success: true,
    //   message: 'User created successfully',
    //   data: result,
    // });

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  }
);

const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await userService.createFaculty(faculty, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty created successfully',
      data: result,
    });
  }
);

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await userService.createAdmin(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty created successfully',
      data: result,
    });
  }
);

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
