import { Types } from "mongoose";

export interface TAdmin {
    id: string;
    name: {
      firstName: string;
      middleName?: string;
      lastName: string;
    };
    dateOfBirth: Date;
    email: string;
    contactNo: string;
    emergencyContactNo?: string;
    presentAddress: {
      division: string;
      district: string;
    };
    permanentAddress?: {
      division: string;
      district: string;
    };
    profileImage?: string;
    // managementUsers: Types.ObjectId[];
    isDeleted: boolean;
  }
  