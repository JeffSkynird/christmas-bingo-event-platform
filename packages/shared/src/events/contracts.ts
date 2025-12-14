import type { IntegrationEvent } from "../messaging/envelope";
import type { AccessCode } from "../domain/access-code";
import type { EventId, TicketId, UserId, PaymentId } from "../domain/ids";

export const EventTypes = {
  TicketReserved: "ticketing.ticket.reserved.v1",
  PaymentConfirmed: "ticketing.payment.confirmed.v1",
  TicketIssued: "ticketing.ticket.issued.v1",
  EventStageChanged: "events.event.stage-changed.v1",
  NumberCalled: "gameplay.number.called.v1"
} as const;

export type EventStage = "DRAFT" | "SALE" | "LIVE" | "CLOSED";

/** 1) TicketReserved */
export type TicketReservedPayload = {
  ticketId: TicketId;
  eventId: EventId;
  userId: UserId;
  priceCents: number;
  currency: "USD" | "EUR" | "GBP" | "MXN" | "COP" | "PEN" | "CLP" | "ARS" | "BRL" | "ECU"; // ajusta luego
  reservedAt: string;
};

export type TicketReservedEvent = IntegrationEvent<
  typeof EventTypes.TicketReserved,
  TicketReservedPayload
>;

/** 2) PaymentConfirmed */
export type PaymentConfirmedPayload = {
  ticketId: TicketId;
  paymentId: PaymentId;
  amountCents: number;
  currency: TicketReservedPayload["currency"];
  confirmedAt: string;
};

export type PaymentConfirmedEvent = IntegrationEvent<
  typeof EventTypes.PaymentConfirmed,
  PaymentConfirmedPayload
>;

/** 3) TicketIssued */
export type TicketIssuedPayload = {
  ticketId: TicketId;
  accessCode: AccessCode;
  issuedAt: string;
};

export type TicketIssuedEvent = IntegrationEvent<
  typeof EventTypes.TicketIssued,
  TicketIssuedPayload
>;

/** 4) EventStageChanged */
export type EventStageChangedPayload = {
  eventId: EventId;
  from: EventStage;
  to: EventStage;
  changedAt: string;
};

export type EventStageChangedEvent = IntegrationEvent<
  typeof EventTypes.EventStageChanged,
  EventStageChangedPayload
>;

/** 5) NumberCalled */
export type NumberCalledPayload = {
  eventId: EventId;
  number: number;
  calledAt: string;
  calledBy: string;
};

export type NumberCalledEvent = IntegrationEvent<
  typeof EventTypes.NumberCalled,
  NumberCalledPayload
>;

export type AllIntegrationEvents =
  | TicketReservedEvent
  | PaymentConfirmedEvent
  | TicketIssuedEvent
  | EventStageChangedEvent
  | NumberCalledEvent;
