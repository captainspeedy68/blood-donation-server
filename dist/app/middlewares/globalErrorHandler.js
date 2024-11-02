"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Something went wrong';
    return res.status(statusCode).json({
        success: false,
        message: errorMessage,
    });
};
exports.handleError = handleError;
