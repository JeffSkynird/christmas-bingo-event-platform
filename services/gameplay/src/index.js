const path = require("path");
const { createHttpServer } = require("./interfaces/http/server");
const { HealthQuery } = require("./application/health/health.query");
const { createPool, ping } = require("./infrastructure/db/pool");
const { runMigrations } = require("./infrastructure/db/migrate");

const port = process.env.PORT || 3002;

async function main() {
  const pool = createPool();

  await runMigrations({
    pool,
    schema: "gameplay",
    migrationsDir: path.join(__dirname, "..", "migrations")
  });

  const healthQuery = new HealthQuery({ dbPing: () => ping(pool) });

  const app = createHttpServer({ healthQuery });

  app.listen(port, () => {
    console.log(`[gameplay] listening on ${port}`);
  });
}

main().catch((err) => {
  console.error("[gameplay] fatal error", err);
  process.exit(1);
});
