// import express from "express";
import { Router, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// const router = express.Router();
const router = Router();

import { IUser, UserModel } from "../models/user";
import { UserErrors } from "../common/errors";

router.post("/register", async (req: Request, res: Response) => {

  console.log('register')

  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ type: err });
  }

});



export { router as userRouter };
