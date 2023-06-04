import { IUser } from './users.interface'
import { User } from './users.model'
import { generatedUserId } from './users.utils'
import ApiError from '../../../errors/ApiError'
import config from '../../../config'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto-generated incremental id
  const id = await generatedUserId()

  user.id = id
  //default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!')
  }
  return createdUser
}

export default { createUser }
