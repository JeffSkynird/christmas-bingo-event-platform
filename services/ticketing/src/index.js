const { createHttpServer } = require("./interfaces/http/server");
const { HealthQuery } = require("./application/health/health.query");

const port = process.env.PORT || 3001;

async function main() {
  const healthQuery = new HealthQuery();

  const app = createHttpServer({ healthQuery });

  app.listen(port, () => {
    console.log(`[ticketing] listening on ${port}`);
  });
}

main().catch((err) => {
  console.error("[ticketing] fatal error", err);
  process.exit(1);
});
