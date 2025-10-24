import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Marker Fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationApp() {
  const [locations, setLocations] = useState([]);
  const [input, setInput] = useState("");

  const addLocation = () => {
    if (!input.trim()) return;
    const lat = 52.52 + Math.random() * 0.01;
    const lng = 13.405 + Math.random() * 0.01;
    setLocations([...locations, { name: input, lat, lng }]);
    setInput("");
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Test</h1>
      <h2>Meine Locations</h2>
      <p>Die Karte sollte unten sichtbar sein 👇</p>

      <input
        type="text"
        placeholder="Ort eingeben"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button onClick={addLocation}>Hinzufügen</button>

      <MapContainer
        center={[52.52, 13.405]}
        zoom={10}
        style={{ height: "400px", width: "100%", marginTop: "20px" }}
        whenCreated={(map) => {
          setTimeout(() => {
            map.invalidateSize();
          }, 0);
        }}
      >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((loc, index) => (
          <Marker key={index} position={[loc.lat, loc.lng]}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default LocationApp;
