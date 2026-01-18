import express from "express";
import tokenRouter from "./routes/token";
import justifyRouter from "./routes/justify";

const app = express();

app.use(express.json());
app.use(express.text({ type: "text/plain" }));

app.use("/api", tokenRouter);
app.use("/api", justifyRouter);

app.get("/health", (_req, res) => {
  res.send("OK");
});

export default app;
