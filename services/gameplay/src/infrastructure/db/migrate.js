const fs = require("fs");
const path = require("path");

async function ensureMigrationsTable(pool, schema) {
  await pool.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${schema}.schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}

async function appliedMigrations(pool, schema) {
  const { rows } = await pool.query(`SELECT name FROM ${schema}.schema_migrations;`);
  return new Set(rows.map(r => r.name));
}

async function runMigrations({ pool, schema, migrationsDir }) {
  await ensureMigrationsTable(pool, schema);
  const applied = await appliedMigrations(pool, schema);

  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    if (applied.has(file)) continue;

    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query(
        `INSERT INTO ${schema}.schema_migrations(name) VALUES ($1);`,
        [file]
      );
      await client.query("COMMIT");
      console.log(`[migrate:${schema}] applied ${file}`);
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = { runMigrations };
