import { RequestHandler } from 'express';
import { AdminServices } from './admin.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';


const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { adminId, userId } = req.params;
    const result = await AdminServices.deleteUser(adminId, userId);
    sendResponse(res, {
        statusCode: httpStatus.OK, 
        success: true,  
        message: result.message,  
        data: result  
      });
  } catch (error) {
    next(error);
  }
};

export const AdminControllers = {
  deleteUser
};
