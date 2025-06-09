'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [moisture, setMoisture] = useState(null);

  async function fetchMoisture() {
    try {
      const res = await fetch('/api/moisture');
      const data = await res.json();
      setMoisture(data.moisture);
    } catch {
      setMoisture('Fehler');
    }
  }

  useEffect(() => {
    fetchMoisture();
    const interval = setInterval(fetchMoisture, 5000); // alle 5 Sek. aktualisieren
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
      <h1>Feuchtigkeitswert vom Sensor</h1>
      <p style={{ fontSize: '2rem', color: '#0070f3' }}>
        {moisture !== null ? moisture : 'Lade...'}
      </p>
    </main>
  );
}
