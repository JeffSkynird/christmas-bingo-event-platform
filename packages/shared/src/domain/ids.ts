export type Brand<K, T> = K & { __brand: T };

export type EventId = Brand<string, "EventId">;
export type TicketId = Brand<string, "TicketId">;
export type UserId = Brand<string, "UserId">;
export type PaymentId = Brand<string, "PaymentId">;

export const asEventId = (v: string) => v as EventId;
export const asTicketId = (v: string) => v as TicketId;
export const asUserId = (v: string) => v as UserId;
export const asPaymentId = (v: string) => v as PaymentId;
