import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import serialize from 'serialize-javascript';

import config from 'server/config';
import { serverRenderer } from 'renderers/server';
import utils from '../math-utils.js';

import { MongoClient } from 'mongodb';
import { connection as db } from './models';

import * as routes from './routes'

const app = express();
app.enable('trust proxy');
app.use(morgan('common'));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.locals.serialize = serialize;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the LC Database!");
  })
  .catch(error => {
    console.log("Failure connecting to the LC Database!", error);
    process.exit();
  });

try {
  app.locals.gVars = require('../../.reactful.json');
} catch (err) {
  app.locals.gVars = {};
}

// app.get('/', async (req, res) => {
//   try {
//     const vars = await serverRenderer();
//     res.render('index', vars);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// app.get('/users/', (req, res) => {
//   const db = yield MongoClient.connect(MONGO_URL);
//   try {
//     const randomNumbers = utils.random(req.params.numCards);
//     res.send({ randomNumbers });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

routes(app);

app.listen(config.port, config.host, () => {
  fs.writeFileSync(
    path.resolve('.reactful.json'),
    JSON.stringify(
      { ...app.locals.gVars, host: config.host, port: config.port },
      null,
      2
    )
  );

  console.info(`Running on ${config.host}:${config.port}...`);
});