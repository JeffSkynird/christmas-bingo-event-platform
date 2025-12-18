import { useEffect, useState } from "react";

const API = "http://localhost:3001";

export default function App() {
  const [event, setEvent] = useState(null);
  const [stage, setStage] = useState("SALE");

  async function load() {
    const res = await fetch(`${API}/public/event`);
    const data = await res.json();
    setEvent(data.exists ? data : null);
  }

  async function createEvent() {
    const res = await fetch(`${API}/admin/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Christmas Bingo 2025" })
    });
    const data = await res.json();
    await load();
    alert(`Evento creado: ${data.id}`);
  }

  async function publishStage() {
    if (!event?.id) return alert("Primero crea un evento");
    await fetch(`${API}/admin/event/stage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: event.id, toStage: stage })
    });
    await load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Admin - Christmas Bingo</h1>

      <button onClick={createEvent}>Crear evento</button>

      <div style={{ marginTop: 16 }}>
        <p><b>Evento actual:</b> {event ? `${event.name} (${event.stage})` : "No hay evento"}</p>

        <select value={stage} onChange={(e) => setStage(e.target.value)}>
          <option value="DRAFT">DRAFT</option>
          <option value="SALE">SALE</option>
          <option value="LIVE">LIVE</option>
          <option value="CLOSED">CLOSED</option>
        </select>

        <button style={{ marginLeft: 8 }} onClick={publishStage}>
          Publicar {stage}
        </button>

        <button style={{ marginLeft: 8 }} onClick={() => setStage("LIVE")}>
          Publicar LIVE
        </button>
      </div>
    </div>
  );
}
