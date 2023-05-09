const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const { RegisterModel } = require("../model/register.model");

const register = express.Router();

register.post("/", async (req, res) => {
  let { email, password } = req.body;
  //   let item = await RegisterModel.findOne({email});
  try {
    bcrypt.hash(password, 5,async function(err, hash) {
        let data = RegisterModel({email, password:hash});
        await data.save();
        res.status(200).send({'msg':'new user has been created'});
      // Store hash in your password DB.
    });
  } catch (error) {
    res.status(400).send({'msg':'error in creating the user or email is already registered'})
  }
});

module.exports = { register };
