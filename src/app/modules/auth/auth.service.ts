import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helper/jwtHelper';

const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  //create a instance of user
  const user = new User();

  //cheek User exist
  // const isUserExist = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, needPasswordChange: 1 }
  // ).lean();

  /*
static method
 const isUserExist = await user.isUserExist(id);
 */

  //access to our instance
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
  }
  //match password
  if (
    isUserExist.password &&
    !user.isPasswordMatch(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
  }

  //create access token
  const { id: userId, role, needPasswordChange } = isUserExist;
  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  /*
  jwt.sign({
    id:isUserExist.id,
    role:isUserExist.role
  },config.jwt.secret as Secret,{
    expiresIn:config.jwt.expires_in
  })

  /create refresh token
  const refreshToken = jwt.sign({
    id:isUserExist.id,
    role:isUserExist.role
  },config.jwt.secret as Secret,{
    expiresIn:config.jwt.expires_in
  })
  
  */
  //console.log(accessToken, refreshToken, needPasswordChange);
  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify the refresh token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }
  const user = new User();

  const { userId } = verifiedToken;
  //checking deleted user's refresh token
  const isUserExist = await user.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  //generate new token

  const newAccessToken = jwtHelper.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const authService = {
  login,
  refreshToken,
};

/*user.amrmethod-->static methods
//user=new User()
// user.amrmethod-->enostance methods
*/
