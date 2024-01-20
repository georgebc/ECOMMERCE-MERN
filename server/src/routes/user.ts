// import express from "express";
import { Router, Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// const router = express.Router();
const router = Router();

import { IUser, UserModel } from "../models/user";
import { UserErrors } from "../common/errors";

router.post("/register", async (req: Request, res: Response) => {

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

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: IUser = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });

  } catch (err) {
    res.status(500).json({ type: err });
  }
});

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  
  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt.verify(authHeader, "secret", (err: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export { router as userRouter };
