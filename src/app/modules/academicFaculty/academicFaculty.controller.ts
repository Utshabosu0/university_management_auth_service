import httpStatus from 'http-status';
import { IAcademicFaculty } from './academicFaculty.interfaces';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { academicFacultyService } from './academicFaculty.service';
import pick from '../../../shared/pick';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import { paginationFields } from '../../../constant/paginationFields';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;
    const result = await academicFacultyService.createAcademicFaculty(
      academicFacultyData
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty is created successfully',
      data: result,
    });
  }
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await academicFacultyService.getSingleAcademicFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty fetched successfully',
      data: result,
    });
  }
);

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await academicFacultyService.updateAcademicFaculty(
      id,
      updateData
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  }
);

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await academicFacultyService.deleteAcademicFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty deleted successfully',
      data: result,
    });
  }
);

const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await academicFacultyService.getAllAcademicFaculties(
      paginationOptions,
      filters
    );

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculties retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const academicFacultyController = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
  getAllAcademicFaculties,
};
