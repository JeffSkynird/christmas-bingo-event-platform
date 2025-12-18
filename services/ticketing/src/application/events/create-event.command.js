const { randomUUID } = require("crypto");

class CreateEventCommand {
  constructor({ eventRepo }) {
    this.eventRepo = eventRepo;
  }

  async execute({ name }) {
    const id = randomUUID();
    await this.eventRepo.create({ id, name, stage: "DRAFT" });
    return { id };
  }
}

module.exports = { CreateEventCommand };
