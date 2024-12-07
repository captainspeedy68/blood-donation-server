import { model, Schema, Types } from 'mongoose'
import { TClient, TUserName } from './client.interface'
import bcrypt from "bcrypt";
import config from '../../config';

const usernameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  }
})
const addressSchema = new Schema(
  {
    division: { type: String, required: true },
    district: { type: String, required: true },
  },
  { _id: false }
);


const clientSchema = new Schema<TClient>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User Id is required"],
    unique: true,
    ref: "User"
  },
  name: usernameSchema,
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  contactNumber: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: addressSchema, required: true }
  
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});


// virtual
clientSchema.virtual("fullName").get(function(){
  return this.name.firstName + (this.name.middleName ? ' ' + this.name.middleName : '') + ' ' + this.name.lastName;
})

export const Client = model<TClient>("Client", clientSchema);