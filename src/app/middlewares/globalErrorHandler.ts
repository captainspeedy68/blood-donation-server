import { Request, Response, NextFunction } from 'express'

export const handleError = (err: any, req: Request, res: Response, next: NextFunction): Response => {
    const statusCode = err.statusCode || 500
    const errorMessage = err.message || 'Something went wrong'
  
    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
    })
  }