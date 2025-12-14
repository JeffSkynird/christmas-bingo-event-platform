const path = require("path");
const { createHttpServer } = require("./interfaces/http/server");
const { HealthQuery } = require("./application/health/health.query");
const { createPool, ping } = require("./infrastructure/db/pool");
const { runMigrations } = require("./infrastructure/db/migrate");

const port = process.env.PORT || 3001;

async function main() {
  const pool = createPool();

  await runMigrations({
    pool,
    schema: "ticketing",
    migrationsDir: path.join(__dirname, "..", "migrations")
  });

  const healthQuery = new HealthQuery({ dbPing: () => ping(pool) });
  
  const app = createHttpServer({ healthQuery });

  app.listen(port, () => console.log(`[ticketing] listening on ${port}`));
}

main().catch((err) => {
  console.error("[ticketing] fatal error", err);
  process.exit(1);
});
