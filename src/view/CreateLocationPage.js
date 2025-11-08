import { useNavigate, useLocation } from "react-router-dom";
import { useError } from "../ErrorContext";
import { useState } from "react";

export default function CreateLocationPage() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const latitude = query.get("lat");
  const longitude = query.get("lng");
    const { showError } = useError();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const location = {name, description, date, latitude, longitude };
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/api/locations/createLocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(location),
      });

    
      if (response.status === 401) {
        showError("Nicht autorisiert. Bitte einloggen.");
        return;
      }

      if (!response.ok) {
        const text = await response.text();
        showError("Fehler beim Erstellen: " + text);
        return;
      }

      const createdLocation = await response.json();
      alert("Location erstellt!");
      navigate(`/location/${createdLocation.id}`, { state: createdLocation, replace: true });

    } catch (err) {
      showError("Fehler: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Neue Location erstellen</h2>
      <p>
        Koordinaten: <b>{latitude}</b>, <b>{longitude}</b>
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
