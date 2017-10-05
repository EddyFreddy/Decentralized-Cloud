'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
  email: String,
  password: String,
  files: Array
});

const UserModel = mongoose.model('User', User);

exports.getUser = (email) => {
  return UserModel.findOne({email});
};

exports.getUsers = async () => {
  return UserModel.find();
};

exports.deleteOne = async (data) => {
  let email = data.email;
  return UserModel.find({ email }).remove();
};

exports.findUser = async (data) => {
  return UserModel.findOne({ email: data });
};

exports.createUser = async (data) => {
  const hash = await bcrypt.hash(data.password, saltRounds);
  const newUser = new UserModel ({
    ...data,
    password: hash,
    files: []
  });
  await newUser.save();
};
