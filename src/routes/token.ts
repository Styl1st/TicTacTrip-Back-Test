import { Router } from "express";
import { createToken } from "../services/token.service";

const router = Router();

router.post("/token", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const token = createToken(email);
  res.json({ token });
});

export default router;
