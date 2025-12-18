const express = require("express");
const cors = require("cors");

function createHttpServer({ healthQuery, getPublicEventQuery, createEventCommand, changeEventStageCommand }) {
  const app = express();
  app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  app.use(express.json());

  app.get("/", (_req, res) => res.json({ service: "ticketing", ok: true }));

  app.get("/health", async (_req, res) => {
    const result = await healthQuery.execute();
    res.json(result);
  });

  // PUBLIC
  app.get("/public/event", async (_req, res) => {
    const result = await getPublicEventQuery.execute();
    res.json(result);
  });

  // ADMIN (MVP: sin auth todavía)
  app.post("/admin/event", async (req, res) => {
    try {
      const name = req.body?.name || "Christmas Bingo";
      const result = await createEventCommand.execute({ name });
      res.status(201).json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  app.post("/admin/event/stage", async (req, res) => {
    try {
      const { eventId, toStage } = req.body || {};
      if (!eventId || !toStage) return res.status(400).json({ error: "eventId and toStage are required" });

      const result = await changeEventStageCommand.execute({ eventId, toStage });
      res.json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  return app;
}

module.exports = { createHttpServer };
