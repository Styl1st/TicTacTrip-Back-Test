import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { rateLimitMiddleware } from "../middlewares/rateLimit.middleware";

const router = Router();

router.post("/justify", authMiddleware, rateLimitMiddleware, (req, res) => {
  const text = req.body as string;
  res.type("text/plain").send(text);
});

export default router;