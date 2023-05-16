import express from "express";
import SocketConnector from "./connectors/SockterConnector";
import cors from "cors";
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/api/logistic", (req, res) => {
  res.send("ok");
});

const wss = new SocketConnector(server, {
  allowEIO3: true,
  cors: {
        origin: true,
        credentials: true
   },
});

export { wss }

export default server;
