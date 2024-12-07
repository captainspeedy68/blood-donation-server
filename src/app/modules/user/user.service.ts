import config from '../../config'
import { TClient } from '../client/client.interface'
import { Client } from '../client/client.model'
import { TDonor } from '../donor/donor.interface'
import { Donor } from '../donor/donor.model'
import { TUser } from './user.interface'
import { User } from './user.model'

const createClientIntoDB = async (password: string, clientData: TClient) => {
  // creating a user object to set role and password
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_password as string)

  //   set role
  userData.role = 'client'

  userData.id = '6245'

  const result = await User.create(userData)
  if (Object.keys(result).length) {
    clientData.id = result.id
    clientData.user = result._id

    const newClient = await Client.create(clientData)
    return newClient
  }

  // console.log(result);
}


const createDonorIntoDB = async(password: string, donorData: TDonor) =>{
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'client';
  userData.id = '6329';;
  const result = await User.create(userData);
  if(Object.keys(result).length){
    donorData.id = result.id;
    donorData.user = result._id;
    const newDonor = await Donor.create(donorData);
    return newDonor;
  }
}

export const UserServices = {
  createClientIntoDB,
  createDonorIntoDB
}
