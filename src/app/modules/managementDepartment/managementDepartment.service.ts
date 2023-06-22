import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import { managementDepartmentSearchableFields } from './managementDepartment.constants';
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interfaces';
import { ManagementDepartment } from './managementDepartment.model';

const createManagementDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getSingleManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id);
  return result;
};

const getAllManagementDepartments = async (
  paginationOptions: IPaginationOptions,
  filters: IManagementDepartmentFilters
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: managementDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await ManagementDepartment.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const managementDepartmentService = {
  createManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
  getAllManagementDepartments,
};
