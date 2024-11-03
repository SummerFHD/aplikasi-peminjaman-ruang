"use strict"

require('../config/database')
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs')

async function index(req, res) {
    return res.render("login");
}

async function login(req, res) {
  const { email, password } = req.body;

  let user = await User.findOne({
    where: {
      email,
    },
  });

  // Jika user tidak ditemukan
  if (!user) {
    // create user admin
        user = await User.create({
            name: 'admin',
            email: email,
            password: bcrypt.hashSync(password, 8)
        })
  }

  const passwordIsValid = user ? bcrypt.compareSync(password, user.password) : bcrypt.compareSync(password, create.password);

  // Jika password tidak valid
  if (!passwordIsValid) {
    const error = "Password not valid";
    return res.render("login", { error });
  }

  // Jika login berhasil
  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  
  return res.redirect("/");
}

async function logout(req, res) {
  req.session.destroy();
  return res.redirect("/login");
}

module.exports = {
    index,
    login,
  logout
}