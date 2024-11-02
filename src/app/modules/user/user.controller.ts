import httpStatus  from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createClient: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, client } = req.body
  // console.log(client);
    const result = await UserServices.createClientIntoDB(password, client);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Client created successfully',
      data: result,
    })
  }
)

export const UserControllers = {
  createClient
}
