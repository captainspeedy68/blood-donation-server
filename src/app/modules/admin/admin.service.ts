import { Admin } from './admin.model';
import { User } from '../user/user.model';
import { startSession, Types } from 'mongoose';
import config from '../../config';


const deleteUser = async (adminId: string, userId: string) => {
    const session = await startSession();
    session.startTransaction();
  
    try {
 
      const adminObjectId = new Types.ObjectId(adminId);
      const userObjectId = new Types.ObjectId(userId);
  

      const admin = await Admin.findById(adminObjectId);
  

      if (!admin) {
        throw new Error('You do not have permission to delete this user');
      }
  
      // Find and delete the user
      const user = await User.findById(userObjectId);
      if (!user) {
        throw new Error('User not found');
      }
  
      user.isDeleted = true;
      await user.save({ session });
  
      // Committing transaction
      await session.commitTransaction();
      session.endSession();
  
      return { success: true, message: 'User deleted successfully' };
    } catch (error) {
      
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };

export const AdminServices = {
  deleteUser
};
