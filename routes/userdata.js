const express = require("express");
const {
  userSignup,
  userLogin,
  getUserById,
  getUsers,
  deleteUser,
  getUserCount,
} = require("../controllers/userController");
const { CartMiddleWare } = require("../middlewares/verifyToken");

const UserData = require("../models/userdata.model");

const userdataRoute = express.Router();

userdataRoute.get("/", CartMiddleWare, async (req, res) => {
  const userId = req.body.userId;

  if (userId) {
    try {
      const userdata = await UserData.find({ userId: userId });
      res.send({ msg: "sucess", data: userdata });
    } catch (err) {}
  }
});

userdataRoute.post("/", CartMiddleWare, async (req, res) => {
  const payload = req.body;

  try {
    await UserData.create(payload);
    res.send({ msg: "successfully added" });
  } catch (err) {
    res.send({ msg: "Error" });
  }
});

module.exports = userdataRoute;
