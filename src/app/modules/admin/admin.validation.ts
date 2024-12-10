import { Types } from 'mongoose'
import { z } from 'zod'

const presentAddressValidationSchema = z.object({
  division: z.string(),
  district: z.string(),
})

const userNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
})

const adminCreationValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      // id: z.string().min(1, 'ID is required').max(100, 'ID is too long'),
      name: userNameValidationSchema,
      dateOfBirth: z.preprocess((value) => {
        if (typeof value === "string") return new Date(value); 
        return value;
      }, z.date()),
      email: z.string().email('Invalid email format').min(1, 'Email is required'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z.string().optional(),
      presentAddress: presentAddressValidationSchema,
      permanentAddress: presentAddressValidationSchema.optional(),
      profileImage: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
})

type TAdminCreationValidated = z.infer<typeof adminCreationValidationSchema>;

export { adminCreationValidationSchema, TAdminCreationValidated };
