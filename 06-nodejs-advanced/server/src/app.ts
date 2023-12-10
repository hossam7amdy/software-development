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

app.get("/api/news-feed", async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  res.write("retry: 10000\n\n");

  res.write(
    "data: " + `Server Time: ${new Date().toLocaleTimeString()}` + "\n\n"
  );

  const sendData = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Simulate SSE data
  const intervalId = setInterval(async () => {
    const data = await getNewsFeed();
    sendData(data);
  }, 5000);

  // Close SSE connection when the client disconnects
  req.on("close", () => {
    clearInterval(intervalId);
  });
});

const getNewsFeed = async () => {
  const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
  const data = await res.json();
  return data;
};

// catch-all route for client-side routing
app.get("/*", (_req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(errMiddleware);

export default app;
