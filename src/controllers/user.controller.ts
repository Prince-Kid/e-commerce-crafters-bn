import { Request, Response } from "express";
import User from "../database/models/user";
import { saveUser } from "../services/userService";

export const Welcome = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .send(
        "<h1 style='text-align:center;font-family: sans-serif'>Welcome to our backend as code crafters team </h1>"
      );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const senddata = await saveUser(req.body);
    res.status(201).json({ message: "User created", user: senddata });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
