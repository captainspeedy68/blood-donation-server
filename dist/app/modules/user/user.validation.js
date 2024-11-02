"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().max(20).optional()
});
