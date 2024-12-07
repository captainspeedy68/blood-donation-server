import express from 'express';
import { ClientControllers } from './client.controller';
const router = express.Router();


router.get('/', ClientControllers.getAllClients);

export const ClientRoutes = router;
