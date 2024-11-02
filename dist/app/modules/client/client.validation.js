"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TClientSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const TUserNameSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    middleName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
exports.TClientSchema = zod_1.z.object({
    id: zod_1.z.string(),
    user: zod_1.z.instanceof(mongoose_1.Types.ObjectId),
    name: TUserNameSchema,
    gender: zod_1.z.enum(['male', 'female']),
    dateOfBirth: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
    contactNumber: zod_1.z.string(),
    bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: zod_1.z.string(),
});
