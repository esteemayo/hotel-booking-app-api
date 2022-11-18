import express from 'express';
import morgan from 'morgan';

// requireing routes
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import roomsRoute from './routes/rooms.js';
import hotelsRoute from './routes/hotels.js';

// start express app
const app = express();

// global middlewares
// implement CORS

// Access-Control-Allow-Origin

// set security HTTP headers

// development logging
if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

// limit request from same api

// body Parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// cookie parser middleware

// data sanitization against NoSQL query injection

// data sanitization against XSS

// prevent parameter pollution

// compression middleware

// test middleware

// api routes middleware
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/rooms', roomsRoute);
app.use('/api/v1/hotels', hotelsRoute);

export default app;
