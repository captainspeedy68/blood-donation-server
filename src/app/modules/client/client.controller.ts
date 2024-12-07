import { Request, Response, RequestHandler } from 'express';
import { ClientServices } from './client.service';
import catchAsync from '../../utils/catchAsync';  // Assuming catchAsync handles async errors
import sendResponse from '../../utils/sendResponse';  // Updated sendResponse import

// Controller to fetch all clients (with optional query)
const getAllClients: RequestHandler = catchAsync(async (req, res, next) => {
  console.log("Getting all clients...");
  const { name, email } = req.query;

  if (name || email) {
    // If we have query parameters, fetch by query
    const result = await ClientServices.getClientsByQueryFromDB(String(name), String(email));
    sendResponse(res, {
      success: true,
      message: "Clients found by query",
      statusCode: 200,
      data: result
    });
  } else {
    // If no query, fetch all clients
    const result = await ClientServices.getAllClientsFromDB();
    sendResponse(res, {
      success: true,
      message: "All clients fetched",
      statusCode: 200,
      data: result
    });
  }
});



// Controller to update an existing client
const updateClient: RequestHandler = catchAsync(async (req, res, next) => {
  const { clientId } = req.params;
  const updatedData = req.body;

  // Validate that clientId is provided
  if (!clientId) {
    return sendResponse(res, {
      success: false,
      message: "Client ID is required",
      statusCode: 400,
      data: {}
    });
  }

  const updatedClient = await ClientServices.updateClientInDB(clientId, updatedData);

  if (!updatedClient) {
    return sendResponse(res, {
      success: false,
      message: "Client not found",
      statusCode: 404,
      data: {}
    });
  }

  sendResponse(res, {
    success: true,
    message: "Client updated successfully",
    statusCode: 200,
    data: updatedClient
  });
});

export const ClientControllers = {
  getAllClients,

  updateClient
}
