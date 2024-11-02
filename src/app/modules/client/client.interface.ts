import { Types } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName: string
  lastName: string
}

export type TClient = {
  id: string
  user: Types.ObjectId
  name: TUserName
  gender: 'male' | 'female'
  dateOfBirth?: string
  email: string
  contactNumber: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
}
