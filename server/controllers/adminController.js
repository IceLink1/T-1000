import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Register new admin
export const register = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if admin password is correct
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid admin password" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ name });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create new admin
    const admin = new Admin({
      name,
      password,
    });

    await admin.save();

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT,
      { expiresIn: "60d" }
    );

    res.status(201).json({
      token,
      userdata: admin,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering admin", error: error.message });
  }
};

// Login admin
export const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Find admin
    const admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT,
      { expiresIn: "60d" }
    );

    res.json({
      token,
      userdata: admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
