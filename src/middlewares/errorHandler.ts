import { Request, Response, NextFunction } from 'express';

// Error handling middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(`[ERROR]: ${err.message}`); // Log error details
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined, // Provide stack trace in development only
  });
};

export default errorHandler;
