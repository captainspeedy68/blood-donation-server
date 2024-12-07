import { z } from 'zod';


const addressValidationSchema = z.object({
  division: z.string().min(1, 'Division is required'),
  district: z.string().min(1, 'District is required'),
});


const adminValidationSchema = z.object({
  id: z.string().min(1, 'ID is required').max(100, 'ID is too long'),
  name: z.object({
    firstName: z.string().min(1, 'First name is required'),
    middleName: z.string().optional(),
    lastName: z.string().min(1, 'Last name is required'),
  }),
  dateOfBirth: z.date(),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  contactNo: z.string().min(1, 'Contact number is required'),
  emergencyContactNo: z.string().optional(),
  presentAddress: addressValidationSchema,
  permanentAddress: addressValidationSchema.optional(),
  profileImage: z.string().optional(),
  isDeleted: z.boolean().default(false),
});


type TAdminValidated = z.infer<typeof adminValidationSchema>;

export { adminValidationSchema, TAdminValidated };
