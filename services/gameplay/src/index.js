const { createHttpServer } = require("./interfaces/http/server");
const { HealthQuery } = require("./application/health/health.query");

const port = process.env.PORT || 3002;

async function main() {
  const healthQuery = new HealthQuery();

  const app = createHttpServer({ healthQuery });

  app.listen(port, () => {
    console.log(`[gameplay] listening on ${port}`);
  });
}

main().catch((err) => {
  console.error("[gameplay] fatal error", err);
  process.exit(1);
});
