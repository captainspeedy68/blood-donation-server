import express from "express";
import { UserControllers } from "./user.controller";
import { clientCreationValidationSchema } from "../client/client.validation";

import validationMiddleware from "../../middlewares/validateRequests";
import { donorCreationValidationSchema } from "../donor/donor.validation";


const router = express.Router();


router.post("/create-client", validationMiddleware(clientCreationValidationSchema), UserControllers.createClient);

router.post("/create-donor",validationMiddleware(donorCreationValidationSchema), UserControllers.createDonor);

export const UserRoutes = router;