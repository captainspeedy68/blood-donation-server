import httpStatus from 'http-status'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createClient: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, client } = req.body
  // console.log(req.body);
  const result = await UserServices.createClientIntoDB(password, client)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client created successfully',
    data: result,
  })
})

const createDonor: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, donor } = req.body;
  const result = await UserServices.createDonorIntoDB(password, donor);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donor Created Successfully",
    data: result
  })
})

const createAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, admin } = req.body;
  const result = await UserServices.createAdminIntoDB(password, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const updateClient: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, client } = req.body;
  const result = await UserServices.updateClientInDB(password, client);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client updated successfully',
    data: result,
  });
});

const updateDonor: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, donor } = req.body;
  const result = await UserServices.updateDonorInDB(password, donor);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donor updated successfully",
    data: result,
  });
});

const updateAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, admin } = req.body;
  const result = await UserServices.updateAdminInDB(password, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});


export const UserControllers = {
  createClient,
  createDonor,
  createAdmin,
  updateClient,
  updateDonor,
  updateAdmin,
}
