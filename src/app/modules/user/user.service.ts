import config from '../../config'
import { TClient } from '../client/client.interface'
import { Client } from '../client/client.model'
import { TUser } from './user.interface'
import { User } from './user.model'

const createClientIntoDB = async (password: string, clientData: TClient) => {
  // creating a user object to set role and password
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_password as string)

  //   set role
  userData.role = 'client'

  userData.id = '6242'

  const result = await User.create(userData)
  if (Object.keys(result).length) {
    clientData.id = result.id
    clientData.user = result._id

    const newClient = await Client.create(clientData)
    return newClient
  }

  // console.log(result);
}

export const UserServices = {
  createClientIntoDB,
}
