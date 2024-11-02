"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const mongoose_1 = require("mongoose");
const usernameSchema = new mongoose_1.Schema({
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
});
const clientSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
// virtual
clientSchema.virtual("fullName").get(function () {
    return this.name.firstName + (this.name.middleName ? ' ' + this.name.middleName : '') + ' ' + this.name.lastName;
});
exports.Client = (0, mongoose_1.model)("Client", clientSchema);
