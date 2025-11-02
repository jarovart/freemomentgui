import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function CreateLocationPage() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const latitude = query.get("lat");
  const longtitude = query.get("lng");
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const location = {name, description, date, latitude, longtitude };

    const response = await fetch("http://localhost:8080/api/locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(location),
    });

    if (response.ok) {
      alert("Location erstellt!"); 
      const createdLocation = await response.json();
      navigate(`/location/${createdLocation.id}`, { state: createdLocation, replace: true });
    } else {
      alert("Fehler beim Erstellen!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Neue Location erstellen</h2>
      <p>
        Koordinaten: <b>{latitude}</b>, <b>{longtitude}</b>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <textarea
          type="text"
          placeholder="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <textarea
          type="text"
          placeholder="Dateformat: 2025-05-01T23:59:59"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <button type="submit">Speichern</button>
      </form>
    </div>
  );
}
