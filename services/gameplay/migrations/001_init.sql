CREATE SCHEMA IF NOT EXISTS gameplay;

CREATE TABLE IF NOT EXISTS gameplay.sessions (
  id UUID PRIMARY KEY,
  access_code TEXT NOT NULL UNIQUE,
  event_id UUID NOT NULL,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gameplay.called_numbers (
  id UUID PRIMARY KEY,
  event_id UUID NOT NULL,
  number INT NOT NULL,
  called_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  called_by TEXT NULL,
  UNIQUE (event_id, number)
);

CREATE INDEX IF NOT EXISTS idx_gameplay_called_event ON gameplay.called_numbers(event_id);
