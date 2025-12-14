# ADR-0001: Monorepo + DDD/Hexagonal + Event-Driven (RabbitMQ) + Postgres

## Status
Accepted

## Context
We are building a Christmas Bingo platform with two user-facing frontends (admin + public) and multiple backend services.
We want clear boundaries, testability, and the ability to scale independently.

## Decision
- Use a monorepo with workspaces.
- Implement DDD + Hexagonal Architecture per service:
  - domain/
  - application/
  - infrastructure/
  - interfaces/
- Use RabbitMQ for asynchronous integration events between services.
- Use Postgres as the primary relational database.

## Consequences
### Positive
- Strong separation of concerns and testable core domain logic.
- Clear service ownership and evolution over time.
- Async messaging improves decoupling and resilience.

### Negative / Trade-offs
- More boilerplate and initial setup complexity.
- Requires clear event contracts and idempotent consumers.
