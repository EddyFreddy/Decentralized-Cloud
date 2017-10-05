const Router = require('koa-router');
const router = new Router();

const jwt = require('jsonwebtoken');
const User = require('./models/user');

const userController = require('./controllers/userController.js');

const respond401 = (ctx) => {
  ctx.status = 401;
  throw new Error('Credentials not provided');
};

const authenticate = async (ctx, next) => {
  const header = ctx.headers['authorization'];
  if (!header) respond401();
  const [strategy, token] = header.split(' ');
  if (strategy !== 'Bearer' || !token) respond401();

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const expireDate = new Date(decoded.exp*1000);
  if (expireDate < (new Date())) respond401();

  ctx.user = await User.getUsers(decoded.email);

  await next();
};

// console.log('userController:', userController);
router
  .post('/signup', userController.signup)
  .post('/signin', userController.signin)
  // .get('/signout', userController.signout)
  .get('/protected', authenticate, userController.protected);


module.exports = router;
