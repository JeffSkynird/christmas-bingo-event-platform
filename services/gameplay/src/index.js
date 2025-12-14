const express = require("express");

const app = express();
const port = process.env.PORT || 3002;

app.get("/", (_req, res) => res.json({ service: "gameplay", ok: true }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(port, () => {
  console.log(`[gameplay] listening on ${port}`);
});
