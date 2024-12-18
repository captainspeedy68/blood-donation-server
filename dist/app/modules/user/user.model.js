"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    needsPasswordChange: {
        type: Boolean,
    },
    role: {
        type: String,
        enum: ['admin', 'client', 'donor'],
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
// password hashing pre middleware
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(this, " is pre middleware");
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
    });
});
userSchema.post("save", function (doc, next) {
    doc.password = "",
        next();
});
exports.User = (0, mongoose_1.model)("User", userSchema);
