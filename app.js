import express from 'express';
import morgan from 'morgan';

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

export default app;
