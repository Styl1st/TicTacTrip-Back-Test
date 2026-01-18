import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { rateLimitMiddleware } from "../middlewares/rateLimit.middleware";

const router = express.Router();

router.post("/justify", authMiddleware, rateLimitMiddleware, (req, res) => {
  const text = req.body as string;
  res.send(text);
});

export default router;
