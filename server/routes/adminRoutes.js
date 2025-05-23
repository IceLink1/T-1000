import { Router } from "express";

import { register, login } from "../controllers/adminController.js";

const router = Router();

// Register new admin
router.post("/register", register);

// Login admin
router.post("/login", login);

export default router;