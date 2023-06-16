"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.studentSchema = void 0;
const mongoose_1 = require("mongoose");
const student_constant_1 = require("./student.constant");
exports.studentSchema = new mongoose_1.Schema({
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
    gender: { type: String, enum: student_constant_1.gender },
    bloodGroup: {
        type: String,
        enum: student_constant_1.bloodGroup,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Student = (0, mongoose_1.model)('Student', exports.studentSchema);
