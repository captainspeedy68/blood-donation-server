import express from 'express';
import { AdminControllers } from './admin.controller';

const router = express.Router();


router.delete('/', AdminControllers.deleteUser);

export const AdminRoutes = router;
