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
exports.UserServices = void 0;
const config_1 = __importDefault(require("../../config"));
const client_model_1 = require("../client/client.model");
const user_model_1 = require("./user.model");
const createClientIntoDB = (password, clientData) => __awaiter(void 0, void 0, void 0, function* () {
    // creating a user object to set role and password
    const userData = {};
    userData.password = password || config_1.default.default_password;
    //   set role
    userData.role = 'client';
    userData.id = '6242';
    const result = yield user_model_1.User.create(userData);
    if (Object.keys(result).length) {
        clientData.id = result.id;
        clientData.user = result._id;
        const newClient = yield client_model_1.Client.create(clientData);
        return newClient;
    }
    // console.log(result);
});
exports.UserServices = {
    createClientIntoDB,
};
