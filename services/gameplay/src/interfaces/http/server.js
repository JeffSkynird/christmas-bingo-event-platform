const express = require("express");

function createHttpServer({ healthQuery }) {
  const app = express();

  app.get("/", (_req, res) => res.json({ service: "gameplay", ok: true }));

  app.get("/health", async (_req, res) => {
    const result = await healthQuery.execute();
    res.json(result);
  });

  return app;
}

module.exports = { createHttpServer };
