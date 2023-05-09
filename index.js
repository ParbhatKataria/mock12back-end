const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { register } = require("./route/register.route");
const { login } = require("./route/login.route");
const { employees } = require("./route/employees.route");
const app = express();
require("dotenv").config();
app.use(cors());

app.use(express.json());

app.use("/signup", register);
app.use("/login", login);

app.use("/employees", employees);

app.listen(4500, async (req, res) => {
  try {
    await connection;
    console.log("server is running");
  } catch (error) {
    console.log("server is not running");
  }
});
