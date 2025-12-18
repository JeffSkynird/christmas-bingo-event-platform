class GetPublicEventQuery {
  constructor({ eventRepo }) {
    this.eventRepo = eventRepo;
  }

  async execute() {
    const current = await this.eventRepo.getCurrent();
    if (!current) return { exists: false };
    return {
      exists: true,
      id: current.id,
      name: current.name,
      stage: current.stage
    };
  }
}

module.exports = { GetPublicEventQuery };
