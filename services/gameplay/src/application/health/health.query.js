class HealthQuery {
  async execute() {
    return { status: "ok" };
  }
}

module.exports = { HealthQuery };
