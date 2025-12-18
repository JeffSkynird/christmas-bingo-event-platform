const path = require("path");
const { createHttpServer } = require("./interfaces/http/server");
const { HealthQuery } = require("./application/health/health.query");
const { createPool, ping } = require("./infrastructure/db/pool");
const { runMigrations } = require("./infrastructure/db/migrate");
const { EventRepository } = require("./infrastructure/repositories/event.repo");

const { CreateEventCommand } = require("./application/events/create-event.command");
const { ChangeEventStageCommand } = require("./application/events/change-event-stage.command");
const { GetPublicEventQuery } = require("./application/events/get-public-event.query");

const port = process.env.PORT || 3001;

async function main() {
  const pool = createPool();

  await runMigrations({
    pool,
    schema: "ticketing",
    migrationsDir: path.join(__dirname, "..", "migrations")
  });

  const eventRepo = new EventRepository(pool);

  const healthQuery = new HealthQuery({ dbPing: () => ping(pool) });
  const getPublicEventQuery = new GetPublicEventQuery({ eventRepo });
  const createEventCommand = new CreateEventCommand({ eventRepo });
  const changeEventStageCommand = new ChangeEventStageCommand({ eventRepo });

  const app = createHttpServer({
    healthQuery,
    getPublicEventQuery,
    createEventCommand,
    changeEventStageCommand
  });

  app.listen(port, () => console.log(`[ticketing] listening on ${port}`));
}

main().catch((err) => {
  console.error("[ticketing] fatal error", err);
  process.exit(1);
});
