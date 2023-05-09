const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { RegisterModel } = require("../model/register.model");
const login = express.Router();

login.post("/", async (req, res) => {
  let { email, password } = req.body;
  let { password: hash } = await RegisterModel.findOne({ email });
  try {
    bcrypt.compare(password, hash, function (err, result) {
      console.log(hash, password);
      if (err) {
        res.status(400).send({ msg: "password provided is wrong" });
      }
      if (result) {
        res
          .status(200)
          .send({ token: `Bearer ${jwt.sign({ foo: "bar" }, "masai")}` });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: "wrong credentials" });
  }
});

module.exports = { login };
