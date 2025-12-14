class HealthQuery {
  constructor({ dbPing }) {
    this.dbPing = dbPing;
  }

  async execute() {
    await this.dbPing();
    return { status: "ok", db: "ok" };
  }
}

module.exports = { HealthQuery };
