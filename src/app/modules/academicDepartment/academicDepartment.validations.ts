import { z } from 'zod';

const createDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic faculty is required',
    }),
  }),
});

const updateDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'Academic faculty is required',
      })
      .optional(),
  }),
});

export const academicDepartmentValidation = {
  createDepartmentZodSchema,
  updateDepartmentZodSchema,
};
