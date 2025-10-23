import React, { useState } from "react";

function LocationApp() {
  const [locations, setLocations] = useState([]);
  const [input, setInput] = useState("");

  return (
    <div style={{ margin: "20px" }}>
        <h2>Meine Locations</h2>
        <input
            type="text"
            placeholder="Ort eingeben"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ padding: "5px", marginRight: "10px" }}
        />
        <button
            onClick={() => {
                if (input.trim() !== "") {
                setLocations([...locations, input]);
                setInput(""); // Inputfeld leeren
                }
            }}
            >
            Hinzufügen
        </button>

        <ul>
            {locations.map((loc, index) => (
                <li key={index}>
                {loc}{" "}
                <button
                    onClick={() =>
                    setLocations(locations.filter((_, i) => i !== index))
                    }
                >
                    Löschen
                </button>
                </li>
            ))}
        </ul>


        <ul>
            {locations.map((loc, index) => (
            <li key={index}>{loc}</li>
            ))}
        </ul>
    </div>
  );
}

export default LocationApp;
