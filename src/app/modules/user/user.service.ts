import config from '../../config'
import { TAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
import { TClient } from '../client/client.interface'
import { Client } from '../client/client.model'
import { TDonor } from '../donor/donor.interface'
import { Donor } from '../donor/donor.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { startSession } from 'mongoose';


const createClientIntoDB = async (password: string, clientData: TClient) => {
  // Start a session
  // console()
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
      clientData.id = result[0].id;  
      clientData.user = result[0]._id; 

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
 
    await session.abortTransaction();
    session.endSession();
    throw error;  
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
      donorData.id = result[0].id; 
      donorData.user = result[0]._id; 

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
 
    await session.abortTransaction();
    session.endSession();
    throw error;  
  }
}

const createAdminIntoDB = async (password: string, adminData: TAdmin) => {
 
  const session = await startSession();
  session.startTransaction();

  try {
    // Generating a unique admin ID
    const adminId = await generateUniqueId('admin');

    
    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password as string);
    userData.role = 'admin';
    userData.id = adminId;

    // Create User document within the session
    const result = await User.create([userData], { session });

    if (Object.keys(result).length) {
      adminData.id = result[0].id; // Assign user ID to adminData
      adminData.user = result[0]._id; // Assign user _id to adminData

      // Create Admin document within the session
      const newAdmin = await Admin.create([adminData], { session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      return newAdmin;
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

const updateClientInDB = async (password: string, clientData: TClient) => {
  const session = await startSession();
  session.startTransaction();

  try {
    // Update user information
    const updatedUser = await User.findOneAndUpdate(
      { id: clientData.id },
      { password, role: 'client' },
      { new: true, session }
    );

    if (updatedUser) {
      const updatedClient = await Client.findOneAndUpdate(
        { id: clientData.id },
        clientData,
        { new: true, session }
      );

      await session.commitTransaction();
      session.endSession();
      return updatedClient;
    } else {
      throw new Error('Client update failed');
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateDonorInDB = async (password: string, donorData: TDonor) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: donorData.id },
      { password, role: 'donor' },
      { new: true, session }
    );

    if (updatedUser) {
      const updatedDonor = await Donor.findOneAndUpdate(
        { id: donorData.id },
        donorData,
        { new: true, session }
      );

      await session.commitTransaction();
      session.endSession();
      return updatedDonor;
    } else {
      throw new Error('Donor update failed');
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateAdminInDB = async (password: string, adminData: TAdmin) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: adminData.id },
      { password, role: 'admin' },
      { new: true, session }
    );

    if (updatedUser) {
      const updatedAdmin = await Admin.findOneAndUpdate(
        { id: adminData.id },
        adminData,
        { new: true, session }
      );

      await session.commitTransaction();
      session.endSession();
      return updatedAdmin;
    } else {
      throw new Error('Admin update failed');
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};



export const UserServices = {
  createClientIntoDB,
  createDonorIntoDB,
  createAdminIntoDB,
  updateClientInDB,
  updateDonorInDB,
  updateAdminInDB,
}
