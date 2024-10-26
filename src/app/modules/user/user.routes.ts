import express from "express";
import { UserControllers } from "./user.controller";
const router = express.Router();

router.post("/create-client", UserControllers.createClient);

export const UserRoutes = router;