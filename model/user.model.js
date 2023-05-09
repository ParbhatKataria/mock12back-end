const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    department: String,
    salary: Number,
  },
  { versionKey: false }
);

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
