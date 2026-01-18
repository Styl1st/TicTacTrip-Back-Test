import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { rateLimitMiddleware } from "../middlewares/rateLimit.middleware";
import { justifyText } from "../services/justify.service";

const router = express.Router();

router.post("/justify", authMiddleware, rateLimitMiddleware, (req, res) => {
  const text = req.body as string;
  const justifiedText = justifyText(text, 80);
  res.send(justifiedText);
});

export default router;
