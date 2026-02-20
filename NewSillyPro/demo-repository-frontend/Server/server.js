import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import publicRouter from './routes/public.routes.js';
import errorHandler from './middlewares/errorHandler.js'
import { apis } from './utils/apis.js';
import adminRouter from './routes/admin.routes.js';

// Load environment variables FIRST
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.get('/', (req, res) => {
  res.send('Phluxo Server is running successfully!');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Phluxo API working fine!' });
});

app.get('/api/list', (req, res) => {
  res.json(apis);
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin' , adminRouter);
app.use('/api/public' , publicRouter)

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    availableEndpoints: '/api/list'
  });
});
app.use(errorHandler)
// app.use((err, req, res, next) => {
//   console.error('Server Error:', err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
//   });
// });

app.listen(PORT, () => {
  console.log(`\nPhluxo Server Started Successfully!`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`API Docs: http://localhost:${PORT}/api/list`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Started at: ${new Date().toLocaleString()}\n`);
});