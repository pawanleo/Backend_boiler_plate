import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import connectDB from './config/db'; 
import errorHandler from './middlewares/errorHandler';

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Basic route for health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

// Error handling middleware
app.use(errorHandler);

// Create HTTP server
const server = createServer(app);

// Connect to the database and start the server
connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err: Error) => {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit process on database connection failure
  });

export default app;
