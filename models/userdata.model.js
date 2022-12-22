const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

const UserData = mongoose.model("UserData", userSchema);

module.exports = UserData;
