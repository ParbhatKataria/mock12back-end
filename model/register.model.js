const mongoose = require("mongoose");

const registerSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
  },
  { versionKey: false }
);
const RegisterModel = mongoose.model("register", registerSchema);

module.exports = { RegisterModel };
