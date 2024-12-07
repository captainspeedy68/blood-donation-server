import { Schema, Document, Types,  model } from 'mongoose';
import { TDonor } from './donor.interface';


const userNameSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  { _id: false }  
);


const addressSchema = new Schema(
  {
    division: { type: String, required: true },
    district: { type: String, required: true },
  },
  { _id: false }
);


const donorSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true }, // Reference to User collection
    name: { type: userNameSchema, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    dateOfBirth: { type: Date },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    presentAddress: { type: addressSchema, required: true },
  },
  { timestamps: true } 
);


export const Donor = model<TDonor>("Donor", donorSchema);