import express, { Request, Response } from 'express';
import cors from 'cors';  // <-- import cors
import { Server } from 'http';

// Create the Express app
const app = express();

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:3000',  // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Also explicitly handle preflight OPTIONS requests
app.options('*', cors(corsOptions));

// Your routes
app.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'Backend is working nice!' });
});

// Example login route (replace with your real login handler)
app.post('/api/v1/auth/login', (req: Request, res: Response) => {
  res.json({ message: 'Login successful' });
});

async function bootstrap() {
  const port = 5001;

  const server: Server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server Close');
      });
    }
  };

  const unexpectedHandler = (err?: Error) => {
    console.error('Handler Error', err);
    exitHandler();
    process.exit(1);
  };

  process.on('uncaughtException', unexpectedHandler);
  process.on('unhandledRejection', unexpectedHandler);

  process.on('SIGTERM', () => {
    console.log('Sigterm Recieved');
    if (server) {
      server.close(() => {
        console.log('Server closed due to SIGTERM');
      });
    }
  });
}

bootstrap();
