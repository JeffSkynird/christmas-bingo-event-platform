CREATE SCHEMA IF NOT EXISTS ticketing;

CREATE TABLE IF NOT EXISTS ticketing.events (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  stage TEXT NOT NULL CHECK (stage IN ('DRAFT','SALE','LIVE','CLOSED')),
  starts_at TIMESTAMPTZ NULL,
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ticketing.tickets (
  id UUID PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES ticketing.events(id),
  status TEXT NOT NULL CHECK (status IN ('RESERVED','PAID','ISSUED','REDEEMED','CANCELLED')),
  access_code TEXT NULL UNIQUE,
  buyer_email TEXT NULL,
  buyer_name TEXT NULL,
  price_cents INT NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  reserved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  issued_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Outbox (para event-driven confiable)
CREATE TABLE IF NOT EXISTS ticketing.outbox (
  id UUID PRIMARY KEY,
  type TEXT NOT NULL,
  aggregate_id TEXT NOT NULL,
  version INT NOT NULL,
  occurred_at TIMESTAMPTZ NOT NULL,
  payload JSONB NOT NULL,
  processed_at TIMESTAMPTZ NULL,
  attempts INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ticketing_tickets_event_id ON ticketing.tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_ticketing_outbox_processed ON ticketing.outbox(processed_at);
