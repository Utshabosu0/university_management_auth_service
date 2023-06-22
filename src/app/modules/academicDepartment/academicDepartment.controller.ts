import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { academicDepartmentService } from './academicDepartment.service';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interfaces';
import httpStatus from 'http-status';
import { academicDepartmentFilterableFields } from './academicDepartment.constants';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/paginationFields';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;
    const result = await academicDepartmentService.createAcademicDepartment(
      academicDepartmentData
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is created successfully',
      data: result,
    });
  }
);

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await academicDepartmentService.getSingleAcademicDepartment(
      id
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department fetched successfully',
      data: result,
    });
  }
);

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await academicDepartmentService.updateAcademicDepartment(
      id,
      updateData
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department updated successfully',
      data: result,
    });
  }
);

const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await academicDepartmentService.deleteAcademicDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department deleted successfully',
      data: result,
    });
  }
);

const getAllAcademicDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await academicDepartmentService.getAllAcademicDepartments(
      paginationOptions,
      filters
    );

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);
export const academicDepartmentController = {
  createAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
  getAllAcademicDepartments,
};
