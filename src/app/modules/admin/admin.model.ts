import { Schema, Types, model } from 'mongoose';
import { TAdmin } from './admin.interface';

const addressSchema = new Schema({
  division: { type: String, required: true },
  district: { type: String, required: true },
}, { _id: false });

const adminSchema = new Schema<TAdmin>({
  id: { type: String, unique: true, required: true },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String },
  presentAddress: { type: addressSchema, required: true },
  permanentAddress: { type: addressSchema },
  profileImage: { type: String },
//   managementUsers: [{ type: Types.ObjectId, ref: 'User' }], // A reference to User model, i.e., users this admin manages
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export const Admin = model<TAdmin>('Admin', adminSchema);
