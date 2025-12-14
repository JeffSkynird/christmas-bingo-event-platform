const { Pool } = require("pg");

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is required");
  return new Pool({ connectionString });
}

async function ping(pool) {
  await pool.query("SELECT 1 as ok");
}

module.exports = { createPool, ping };
