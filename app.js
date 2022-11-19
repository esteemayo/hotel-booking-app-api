import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// requireing routes
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import roomsRoute from './routes/rooms.js';
import hotelsRoute from './routes/hotels.js';
import NotFoundError from './errors/notFound.js';
import globalErrorHandler from './middlewares/errorHandler.js';

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
app.use(cookieParser(process.env.COOKIE_SECRET));

// data sanitization against NoSQL query injection

// data sanitization against XSS

// prevent parameter pollution

// compression middleware

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// api routes middleware
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/rooms', roomsRoute);
app.use('/api/v1/hotels', hotelsRoute);

app.all('*', (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

export default app;
