const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (_req, res) => res.json({ service: "ticketing", ok: true }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(port, () => {
  console.log(`[ticketing] listening on ${port}`);
});
