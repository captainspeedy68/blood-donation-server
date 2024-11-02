import { Types } from "mongoose";
import {z} from "zod";

const TUserNameSchema = z.object({
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
  });
 export const TClientSchema = z.object({
    id: z.string(),
    user: z.instanceof(Types.ObjectId), 
    name: TUserNameSchema, 
    gender: z.enum(['male', 'female']),
    dateOfBirth: z.string().optional(), 
    email: z.string().email(), 
    contactNumber: z.string(), 
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string(),
    
  });
