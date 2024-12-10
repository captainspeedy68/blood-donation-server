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
  export const clientCreationValidationSchema = z.object({
    body: z.object({
      password: z.string().optional(),
      client: z.object({
        name: userNameValidationSchema,
        gender: z.enum(['male', 'female']),
        dateOfBirth: z.preprocess((value) => {
          if (typeof value === "string") return new Date(value); 
          return value;
        }, z.date()),
        email: z.string().email(),
        contactNumber: z.string(),
        bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
        presentAddress: presentAddressValidationSchema,
      }),
    }),
  })
