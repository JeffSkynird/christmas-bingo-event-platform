const { EventAggregate } = require("../../domain/event/event.aggregate");

class ChangeEventStageCommand {
  constructor({ eventRepo }) {
    this.eventRepo = eventRepo;
  }

  async execute({ eventId, toStage }) {
    const row = await this.eventRepo.getById(eventId);
    if (!row) throw new Error("Event not found");

    const agg = new EventAggregate({ id: row.id, name: row.name, stage: row.stage });
    agg.changeStage(toStage);

    await this.eventRepo.updateStage({ id: agg.id, stage: agg.stage });

    return { id: agg.id, stage: agg.stage };
  }
}

module.exports = { ChangeEventStageCommand };
