import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import errHandler from './helpers/error-handler';
import routesMounter from './routes'


export default function initApp() {
  const app = express();

  app.use(cors({origin: true, credentials: true}));
  app.use(bodyParser.urlencoded({ extended: false}));
  app.use(bodyParser.json());
  routesMounter(app)
  app.use(errHandler);

  return {app};
}