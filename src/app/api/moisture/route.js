// API-Route: empfängt GET oder POST mit Feuchtigkeitswert und speichert in Memory (nur Beispiel)

let moistureValue = null;

export async function GET(request) {
  // Rückgabe der zuletzt gespeicherten Feuchtigkeit
  return new Response(JSON.stringify({ moisture: moistureValue }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  try {
    const data = await request.json();
    if (typeof data.moisture === 'number') {
      moistureValue = data.moisture;
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ error: 'Ungültige Daten' }), { status: 400 });
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Fehler beim Parsen' }), { status: 400 });
  }
}
