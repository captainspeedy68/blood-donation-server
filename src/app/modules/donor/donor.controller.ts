import httpStatus from 'http-status';
import { Request, RequestHandler, Response } from 'express';
import { DonorServices } from './donor.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';


const getAllDonors: RequestHandler = catchAsync(async (req, res, next) => {
    console.log("Fetching donors...");

    const { bloodGroup, division, district } = req.query;
    console.log(bloodGroup, division, district)
    let result;

    // If there are query parameters
    if (bloodGroup || division || district) {
        result = await DonorServices.getDonorsByQueryFromDB(String(bloodGroup), String(division), String(district));
    } else {
        
        result = await DonorServices.getAllDonorsFromDB();
    }
    console.log(result);
    sendResponse(res, {
        success: true,
        message: 'Donors fetched successfully',
        statusCode: httpStatus.OK,
        data: result,
    });
});

export const DonorControllers = {
    getAllDonors,
};
