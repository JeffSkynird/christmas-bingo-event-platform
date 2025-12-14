class SessionRepository {
  constructor(pool) { this.pool = pool; }

  async create({ id, accessCode, eventId }) {
    await this.pool.query(
      `INSERT INTO gameplay.sessions (id, access_code, event_id)
       VALUES ($1, $2, $3)`,
      [id, accessCode, eventId]
    );
  }
}

module.exports = { SessionRepository };
