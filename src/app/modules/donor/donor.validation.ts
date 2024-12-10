import { Types } from 'mongoose'
import { string, z } from 'zod'

const presentAddressValidationSchema = z.object({
    division: z.string(),
    district: z.string(),
})

const userNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
})
export const donorCreationValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    donor: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.preprocess((value) => {
        if (typeof value === "string") return new Date(value); // Convert string to Date
        return value;
      }, z.date()),
      email: z.string().email(),
      contactNumber: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      status: z.enum(['available', "unavailable"]),
      presentAddress: presentAddressValidationSchema,
    }),
  }),
})
