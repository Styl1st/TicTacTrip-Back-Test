import { Request, Response, NextFunction } from "express";
import { getTokenData } from "../services/token.service";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = authHeader.replace("Bearer ", "");
  const tokenData = getTokenData(token);

  if (!tokenData) {
    return res.status(401).json({ error: "Invalid token" });
  }

  (req as any).tokenData = tokenData;
  (req as any).token = token;

  next();
}