// load .env using dotenv first
import {} from './env';

// include other main deps
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import pkg from '../package.json';
import APP_ROOT from 'app-root-path';

// instantiate express
const app = express();
const PRODUCTION = process.env.NODE_ENV === 'production';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

// static serving from /dist/client
app.use(express.static(APP_ROOT + '/dist/client'));

// example API entry
app.get('/test', (req, res) => res.json({
  foo: 'bar',
  mode: process.env.NODE_ENV,
  port: process.env.PORT,
  production: PRODUCTION
}));

// json import support
app.get('/package.json', (req, res) => res.json(pkg));

const serverPort = process.env.PORT || 3000;
app.listen(serverPort);
console.log(`Express server @ http://localhost:${serverPort} (${PRODUCTION ? 'production' : 'development'})\n`);
