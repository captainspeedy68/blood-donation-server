import express from 'express'
import { UserControllers } from './user.controller'
import { clientCreationValidationSchema } from '../client/client.validation'

import validationMiddleware from '../../middlewares/validateRequests'
import { donorCreationValidationSchema } from '../donor/donor.validation'
import { adminCreationValidationSchema } from '../admin/admin.validation'
// import { adminValidationSchema } from "../admin/admin.validation";

const router = express.Router()

router.post(
  '/create-client',
  validationMiddleware(clientCreationValidationSchema),
  UserControllers.createClient,
)
// router.post(
//   '/create-client',
//   () => {
//     console.log("Hellow");
//   }
// )

router.post(
  '/create-donor',
  validationMiddleware(donorCreationValidationSchema),
  UserControllers.createDonor,
)

router.post(
  '/create-admin',
  validationMiddleware(adminCreationValidationSchema),
  UserControllers.createAdmin,
)
router.put(
  '/update-client',
  validationMiddleware(clientCreationValidationSchema),
  UserControllers.updateClient,
)

router.put(
  '/update-donor',
  validationMiddleware(donorCreationValidationSchema),
  UserControllers.updateDonor,
)

router.put(
  '/update-admin',
  validationMiddleware(adminCreationValidationSchema),
  UserControllers.updateAdmin,
)
export const UserRoutes = router
