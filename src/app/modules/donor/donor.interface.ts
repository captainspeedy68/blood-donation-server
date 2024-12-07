import { Types } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName: string
  lastName: string
}

export type TAddress = {
  division: string;
  district: string;
}

export type TDonor = {
  id: string
  user: Types.ObjectId
  name: TUserName
  gender: 'male' | 'female'
  dateOfBirth?: Date
  email: string
  contactNumber: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: TAddress;
}
