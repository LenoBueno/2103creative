
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './env';

export const configureMiddleware = (app: express.Application) => {
  // Segurança
  app.use(helmet());
  
  // CORS
  app.use(cors({
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
  // Logs
  app.use(morgan('dev'));
  
  // Parse JSON
  app.use(express.json());
  
  // Parse URL encoded
  app.use(express.urlencoded({ extended: true }));
};
