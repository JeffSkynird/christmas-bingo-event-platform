const { canTransition } = require("./event-stage");

class EventAggregate {
  constructor({ id, name, stage }) {
    this.id = id;
    this.name = name;
    this.stage = stage;
  }

  changeStage(toStage) {
    if (!canTransition(this.stage, toStage)) {
      throw new Error(`Invalid stage transition: ${this.stage} -> ${toStage}`);
    }
    this.stage = toStage;
  }
}

module.exports = { EventAggregate };
