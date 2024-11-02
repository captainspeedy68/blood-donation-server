"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = require("./app/middlewares/notFound");
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use('/api', routes_1.default);
const test = (req, res) => {
    res.send('Hello World!');
};
app.get('/', test);
// Use the error handler
app.use(globalErrorHandler_1.handleError);
// not found route
app.use(notFound_1.notFound);
exports.default = app;
