const serve = require('koa-static');
const Koa = require('koa');
// const conf = require('./config.js');
const router = require('./router.js');
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const cors = require('kcors');
const app = new Koa();
const errorHandler = require('./errorHandler');
const logger = require('koa-logger');

require('dotenv').config();
require('./db');

app
  .use(logger())
  .use(bodyParser())
  .use(cors())
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 4000);
