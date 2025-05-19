import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { checkAuth } from "../utils/checkAuth.js";
import { checkRole } from "../utils/checkRole.js";

const router = express.Router();

router.get("/my/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/users", checkRole, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/reg", async (req, res) => {
  const user = new User({
    name: req.body.name,
    class: req.body.class,
    role: "USER",
  });

  if (!user.name || !user.class) {
    return res.status(402).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ name: user.name });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  try {
    const newUser = await user.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
      },
      process.env.JWT,
      {
        expiresIn: "30d",
      }
    );

    res.status(201).json({ userdata: newUser, token });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
});

router.post("/admin", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(402).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ name });

  if (!existingUser) {
    return res.status(409).json({ message: "User not found" });
  }

  const currectPassword = await bcrypt.compareSync(
    password,
    process.env.ADMIN,
    process.env.SALT
  );

  if (!currectPassword) {
    return res.status(401).json({ message: "Password is incorrect" });
  }

  try {
    const token = jwt.sign(
      {
        id: existingUser._id,
        role: "ADMIN",
      },
      process.env.JWT,
      {
        expiresIn: "30d",
      }
    );

    res.status(201).json({ userdata: existingUser, token });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
});

// I29dmw01xv

router.delete("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name: req.body.name, class: req.body.class },
      {
        new: true,
      }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
