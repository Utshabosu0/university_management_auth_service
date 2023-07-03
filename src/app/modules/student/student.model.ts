import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from './student.constant';
import { IStudent, StudentModel } from './student.interface';

export const studentSchema = new Schema<IStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
      required: true,
    },
    dateOfBirth: { type: String },
    gender: { type: String, enum: gender, required: true },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: {
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String },
        fatherContactNo: { type: String, required: true },
        matherName: { type: String, required: true },
        matherOccupation: { type: String },
        matherContactNo: { type: String, required: true },
        address: { type: String, required: true },
      },
      required: true,
    },
    localGuardian: {
      type: {
        name: { type: String, required: true },
        occupation: { type: String },
        contactNo: { type: String, required: true },
        address: { type: String, required: true },
      },
      required: true,
    },
    profileImage: {
      type: String,
      // required: true
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Student = model<IStudent, StudentModel>('Student', studentSchema);
