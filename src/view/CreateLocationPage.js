import { useLocation } from "react-router-dom";

export default function CreateLocation() {
  const { state } = useLocation();
  const { lat, lng } = state || {};

  return (
    <div style={{ padding: 16 }}>
      <h2>Neue Location erstellen</h2>

      <p>
        Koordinaten: <b>{lat}</b> / <b>{lng}</b>
      </p>

      <input placeholder="Name" />
      <input placeholder="Adresse" />
      <button>Speichern</button>
    </div>
  );
}
