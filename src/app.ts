console.log("APP.TS LOADED");

import express from "express";

const app = express();

app.use(express.json());
app.use(express.text({ type: "text/plain" }));

app.get("/health", (_req, res) => {
  res.send("OK");
});

export default app;
