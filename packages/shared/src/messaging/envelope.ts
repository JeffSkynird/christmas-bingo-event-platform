export type ISODateTimeString = string;

export type IntegrationEvent<
  TType extends string = string,
  TPayload = unknown
> = {
  type: TType;

  eventId: string;

  occurredAt: ISODateTimeString;

  aggregateId: string;

  version: number;

  payload: TPayload;

  correlationId?: string;
  causationId?: string;

  meta?: Record<string, unknown>;
};
