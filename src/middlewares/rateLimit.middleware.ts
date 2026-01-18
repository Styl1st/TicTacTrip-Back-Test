import { Request, Response, NextFunction } from "express";
import { getTokenData } from "../services/token.service";

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  const tokenData = (req as any).tokenData;

  if (!tokenData) {
    return res.status(401).json({ error: "Missing token data" });
  }

  const today = new Date().toISOString().split("T")[0];
  const words = countWords(req.body as string);

  // reset daily counter if date changed
  if (tokenData.lastResetDate !== today) {
    tokenData.wordsUsedToday = 0;
    tokenData.lastResetDate = today;
  }

  if (tokenData.wordsUsedToday + words > 80000) {
    return res.status(402).json({ error: "Payment Required: word limit exceeded" });
  }

  tokenData.wordsUsedToday += words;

  next();
}
