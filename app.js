import express from 'express';
import morgan from 'morgan';

// requireing routes
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import roomRoute from './routes/rooms.js';
import hotelRoute from './routes/hotels.js';

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

// cookie parser middleware

// data sanitization against NoSQL query injection

// data sanitization against XSS

// prevent parameter pollution

// compression middleware

// test middleware

// api routes middleware
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/rooms', roomRoute);
app.use('/api/v1/hotels', hotelRoute);

export default app;
