import config from '../../config'
import { TClient } from '../client/client.interface'
import { Client } from '../client/client.model'
import { TDonor } from '../donor/donor.interface'
import { Donor } from '../donor/donor.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { startSession } from 'mongoose';


const createClientIntoDB = async (password: string, clientData: TClient) => {
  // Start a session
  const session = await startSession();
  session.startTransaction();

  try {
    // generating a unique id here
    const clientId = await generateUniqueId('client');


    // Create user object to set role and password
    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password as string);
    userData.role = 'client';
    userData.id = clientId;

    // Create User document within the session
    const result = await User.create([userData], { session });

    if (Object.keys(result).length) {
      clientData.id = result[0].id;  // Assign user ID to clientData
      clientData.user = result[0]._id; // Assign user _id to clientData

      // Create Client document within the session
      const newClient = await Client.create([clientData], { session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      return newClient;
    } else {
      throw new Error('User creation failed');
    }
  } catch (error) {
    // Rollback the transaction if any operation fails
    await session.abortTransaction();
    session.endSession();
    throw error;  // Re-throw the error to be handled by the caller
  }
}

const createDonorIntoDB = async (password: string, donorData: TDonor) => {
  // Start a session
  const session = await startSession();
  session.startTransaction();

  try {
    // generating a unique donor id here
    const donorId = await generateUniqueId('donor');

    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password as string);
    userData.role = 'donor';
    userData.id = donorId;

    // Create User document within the session
    const result = await User.create([userData], { session });

    if (Object.keys(result).length) {
      donorData.id = result[0].id; // Assign user ID to donorData
      donorData.user = result[0]._id; // Assign user _id to donorData

      // Create Donor document within the session
      const newDonor = await Donor.create([donorData], { session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      return newDonor;
    } else {
      throw new Error('User creation failed');
    }
  } catch (error) {
    // Rollback the transaction if any operation fails
    await session.abortTransaction();
    session.endSession();
    throw error;  // Re-throw the error to be handled by the caller
  }
}



const generateUniqueId = async (role: string) => {

  const timestamp = Date.now().toString().slice(-6); 
  
  // Get the last created user to get the latest index
  const latestUser = await User.findOne().sort({ createdAt: -1 }).exec();
  const latestIndex = latestUser ? parseInt(latestUser.id.slice(1)) : 0; 

  const newIndex = latestIndex + 1;

  return `${role.charAt(0).toUpperCase()}${timestamp}${newIndex.toString().padStart(5, '0')}`;
};



export const UserServices = {
  createClientIntoDB,
  createDonorIntoDB
}
