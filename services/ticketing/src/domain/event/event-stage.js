const EventStage = Object.freeze({
  DRAFT: "DRAFT",
  SALE: "SALE",
  LIVE: "LIVE",
  CLOSED: "CLOSED",
});

function canTransition(from, to) {
  const order = [EventStage.DRAFT, EventStage.SALE, EventStage.LIVE, EventStage.CLOSED];
  const fromIdx = order.indexOf(from);
  const toIdx = order.indexOf(to);
  return fromIdx !== -1 && toIdx !== -1 && toIdx >= fromIdx; // no retroceder
}

module.exports = { EventStage, canTransition };
