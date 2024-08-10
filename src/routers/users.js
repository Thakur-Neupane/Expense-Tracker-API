import express from "express";
import { getUserByEmail, insertUser } from "../models/user/UserModel.js";
import { compairPassword, hasPassword } from "../utils/bcryptjs.js";
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json({
      status: "success",
      message: "todo get",
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  try {
    req.body.password = hasPassword(req.body.password);
    const result = await insertUser(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "Your new account has been created, You may login now",
        })
      : res.json({
          status: "error",
          message: "Unabel to process your request try again later",
        });
  } catch (error) {
    console.log(error);
    let code = 500;
    if (error.message.includes("E11000 duplicate key error collection")) {
      code = 200;
      error.message =
        "There is already another account associated to this email. Use different email to sigup";
    }
    res.status(code).json({
      status: "error",
      message: error.message,
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //get the user email and get user from db
    const user = await getUserByEmail(email);
    console.log(user);

    if (user?._id) {
      //compare password
      const isMatched = compairPassword(password, user.password);
      user.password = undefined;
      if (isMatched) {
        //authorized
        return res.json({
          status: "success",
          message: "Logged in successfully",
          user,
        });
      }
    }

    return res.json({
      status: "error",
      message: "Invalid login credentials",
    });
  } catch (error) {
    console.log(error);
    let code = 500;

    res.status(code).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
