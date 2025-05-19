import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function checkAuth(req, res, next) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT);
      req.user = decoded;
      return next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" , error});
  }
  return res.status(401).json({ message: "Unauthorized" });
}
