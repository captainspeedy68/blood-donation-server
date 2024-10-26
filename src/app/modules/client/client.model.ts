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
    type: String,
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
  presentAddress: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});

// password hashing





// virtual
clientSchema.virtual("fullName").get(function(){
  return this.name.firstName + (this.name.middleName ? ' ' + this.name.middleName : '') + ' ' + this.name.lastName;
})

export const Client = model<TClient>("Client", clientSchema);