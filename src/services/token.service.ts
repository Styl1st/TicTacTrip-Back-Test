import crypto from "crypto";

type TokenData = {
  email: string;
  wordsUsedToday: number;
  lastResetDate: string; // YYYY-MM-DD
};

const tokenStore = new Map<string, TokenData>();

export function createToken(email: string): string {
  const token = crypto.randomBytes(32).toString("hex");

  tokenStore.set(token, {
    email,
    wordsUsedToday: 0,
    lastResetDate: new Date().toISOString().split("T")[0],
  });

  return token;
}

export function getTokenData(token: string): TokenData | undefined {
  return tokenStore.get(token);
}
