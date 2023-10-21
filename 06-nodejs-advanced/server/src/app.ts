import cors, { CorsOptions } from "cors";
import express from "express";
import path from "path";

import { errHandler, errMiddleware } from "./middleware/error-middleware";
import loggerMiddleware from "./middleware/logger-middleware";

const app = express();

const corsConfig: CorsOptions = {
  origin: ["*"],
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(errHandler(loggerMiddleware));

app.get("/api/healthz", (_req, res) => {
  return res.send({ status: "🤞" });
});

// catch-all route for client-side routing
app.get("/*", (_req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(errMiddleware);

export default app;
