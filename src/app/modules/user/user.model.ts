/* eslint-disable @typescript-eslint/no-this-alias */

import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    needPasswordChange: { type: Boolean, default: true },
    passwordChangedAt: {
      type: Date,
    },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, role: 1, password: 1, needPasswordChange: 1 }
  );
  return user;
};

userSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(givenPassword, savedPassword);

  return isMatch;
};

/*
userSchema.statics.isUserExist=async function(id:string):Promise<Pick<IUser,'id'|'password'|'needPasswordChange'>|null>{
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1 }
  );
  return user;
}

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
):Promise<boolean> {
  const isMatch = await bcrypt.compare(givenPassword, savedPassword);

  return isMatch
};

*/

userSchema.pre('save', async function (next) {
  //hash Password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );

  if (!user.needPasswordChange) {
    user.passwordChangedAt = new Date();
  }

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
