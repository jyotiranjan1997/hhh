const express = require("express");
const {
  userSignup,
  userLogin,
  getUserById,
  getUsers,
  deleteUser,
  getUserCount,
} = require("../controllers/userController");
const { VerifyAdmin, CartMiddleWare } = require("../middlewares/verifyToken");
const User = require("../models/User");

const userRoutes = express.Router();

/* SIGNUP */
userRoutes.post("/signup", userSignup);

/* LOGIN */
userRoutes.post("/login", userLogin);

userRoutes.get("/single", CartMiddleWare, async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    res.send({ msg: "success", user: user });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

userRoutes.patch("/update", CartMiddleWare, async (req, res) => {
  console.log("kkk");
  const { userId } = req.body;
  const { name, email } = req.body;

  try {
    const user = User.findOne({ _id: userId });
    if (user) {
      await User.findByIdAndUpdate({ _id: userId }, { name, email });
      res.send({ msg: "updated success" });
    }
  } catch (err) {
    res.send({ msg: "error" });
  }
});

/* Get user Count*/
userRoutes.get("/count", VerifyAdmin, getUserCount);

/* GET ALL USER */
userRoutes.get("/", VerifyAdmin, getUsers);

/* GET USER */
userRoutes.get("/:id", VerifyAdmin, getUserById);

/* DELETE USER */
userRoutes.delete("/:id", VerifyAdmin, deleteUser);

module.exports = userRoutes;

// firstName
// lastName
// email
// phone
// password
