'use strict';

const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const atob = require('atob');

exports.signin = async ctx => {
  const saltRounds = 10;
  const header = ctx.headers['authorization']
    ? ctx.headers['authorization'].split(' ')
    : [];
  if (header.length < 2) {
    ctx.status = 401;
    throw new Error('Credentials not provided');
  }

  const [email, password] = atob(header[1]).split(':');
  const user = await User.getUser(email);
  if (!user) {
    ctx.status = 401;
    throw new Error('Credentials not valid');
  }
  if (await bcrypt.compare(password , user.password)) {
    const token = await jwt.sign({email}, 'winniethepoop', {expiresIn: 2502000});
    ctx.body = {
      user: {
        email: user.email,
        files: user.files,
      },
      token,
    };
    ctx.status = 200;
  }
  else {
    ctx.status = 400;
  }
};

exports.deleteUser = async ctx => {
  const users = await User.getUsers();
  for (let i = 0; i < users.length; i++) {
    if (ctx.request.body.email === users[i].email) {
      if (await bcrypt.compare(ctx.request.body.password , users[i].password)) {
        User.deleteOne(ctx.request.body);
        ctx.status = 201;
      } else {
        ctx.body = 'email and password combination not accepted';
        ctx.status = 401;
      }
    }
  }

};

exports.signup = async ctx => {
  const email = ctx.request.body.email;
  const user = await User.getUser(email);

  if (user !== null) throw new Error('Username already exists.');

  await User.createUser({
    email,
    password: ctx.request.body.password,
  });
  ctx.status = 201;

};

exports.protected = ctx => ctx.body = ctx.user;
