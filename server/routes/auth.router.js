import express from "express";
import { register, loginAdmin, loginUser, getUserById, getAllUsers,getUserDate } from "../controllers/auth.controller.js";
import { checkAuth } from "../utils/checkAuth.js";
import { checkRole } from "../utils/checkRole.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/my/:id", checkAuth, getUserById);

router.get("/check", checkAuth, getUserDate);

router.get("/users", checkAuth, checkRole, getAllUsers);

router.post("/reg", register);

router.post("/admin", loginAdmin);

router.post("/login", loginUser);

router.delete("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {ц
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
