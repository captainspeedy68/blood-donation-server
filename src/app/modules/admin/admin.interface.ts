// import { TUser } from './../user/user.interface';
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


export type TAdmin = {
  user: Types.ObjectId
  id: string
  name: TUserName
  dateOfBirth: Date
  email: string
  contactNo: string
  emergencyContactNo?: string
  presentAddress: TAddress

  profileImage?: string
  // managementUsers: Types.ObjectId[];
  isDeleted: boolean
}
