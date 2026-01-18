import { Request, Response, NextFunction } from "express";
import { getTokenData } from "../services/token.service";

const DAILY_LIMIT = 80000;

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = (req as any).token;
  const tokenData = getTokenData(token);

  if (!tokenData) {
    return res.status(401).json({ error: "Invalid token" });
  }

  // reset daily counter if day changed
  const today = getToday();
  if (tokenData.lastResetDate !== today) {
    tokenData.wordsUsedToday = 0;
    tokenData.lastResetDate = today;
  }

  const text = req.body as string;
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  if (tokenData.wordsUsedToday + words > DAILY_LIMIT) {
    return res.status(402).json({ error: "Payment required: daily limit exceeded" });
  }

  tokenData.wordsUsedToday += words;
  next();
}