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

  async getById(id) {
    const { rows } = await this.pool.query(
      `SELECT * FROM ticketing.events WHERE id = $1 LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  }

  async updateStage({ id, stage }) {
    const { rowCount } = await this.pool.query(
      `UPDATE ticketing.events
       SET stage = $2, updated_at = now()
       WHERE id = $1`,
      [id, stage]
    );
    return rowCount > 0;
  }
}

module.exports = { EventRepository };
