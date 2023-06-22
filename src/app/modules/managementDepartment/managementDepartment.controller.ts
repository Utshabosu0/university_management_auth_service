import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IManagementDepartment } from './managementDepartment.interfaces';
import httpStatus from 'http-status';
import { managementDepartmentService } from './managementDepartment.service';
import pick from '../../../shared/pick';
import { managementDepartmentFilterableFields } from './managementDepartment.constants';
import { paginationFields } from '../../../constant/paginationFields';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentData } = req.body;
    const result = await managementDepartmentService.createManagementDepartment(
      managementDepartmentData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department is created successfully',
      data: result,
    });
  }
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await managementDepartmentService.getSingleManagementDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department fetched successfully',
      data: result,
    });
  }
);

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await managementDepartmentService.updateManagementDepartment(
      id,
      updateData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'management Department updated successfully',
      data: result,
    });
  }
);

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await managementDepartmentService.deleteManagementDepartment(
      id
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department deleted successfully',
      data: result,
    });
  }
);

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result =
      await managementDepartmentService.getAllManagementDepartments(
        paginationOptions,
        filters
      );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);
export const managementDepartmentController = {
  createManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
  getAllManagementDepartments,
};
