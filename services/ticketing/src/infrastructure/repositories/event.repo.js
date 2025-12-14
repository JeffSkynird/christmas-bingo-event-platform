class EventRepository {
  constructor(pool) { this.pool = pool; }

  async create({ id, name, stage = "DRAFT" }) {
    await this.pool.query(
      `INSERT INTO ticketing.events (id, name, stage)
       VALUES ($1, $2, $3)`,
      [id, name, stage]
    );
  }

  async getCurrent() {
    const { rows } = await this.pool.query(
      `SELECT * FROM ticketing.events ORDER BY created_at DESC LIMIT 1`
    );
    return rows[0] || null;
  }
}

module.exports = { EventRepository };
