import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/my/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
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

  try {
    const newUser = await User.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
});

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
