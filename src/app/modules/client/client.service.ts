import { Client } from './client.model';  
import { Types } from 'mongoose';

//  get all clients
const getAllClientsFromDB = async () => {
  console.log("Fetching all clients...");
  const result = await Client.find();
  // console.log(result);
  return result;
}


const getClientsByQueryFromDB = async (name: string, email: string) => {
  try {
    const result = await Client.find({ 'name.firstName': name, email: email });
    return result;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
}



const updateClientInDB = async (clientId: string, updatedData: {
  name?: { firstName?: string; middleName?: string; lastName?: string };
  gender?: 'male' | 'female';
  dateOfBirth?: Date;
  email?: string;
  contactNumber?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress?: { division?: string; district?: string };
}) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(clientId, updatedData, { new: true });
    return updatedClient;
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
}

export const ClientServices = {
  getAllClientsFromDB,
  getClientsByQueryFromDB,

  updateClientInDB
}
