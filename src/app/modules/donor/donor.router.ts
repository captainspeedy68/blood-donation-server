import express from "express";
import { DonorControllers } from "./donor.controller";
const router = express.Router();



router.get("/", DonorControllers.getAllDonors);

export const DonorRoutes = router;