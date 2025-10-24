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
  const toolbarHeight = 64; // Material UI Standard

  const addLocation = () => {
    if (!input.trim()) return;
    const lat = 52.52 + Math.random() * 0.01;
    const lng = 13.405 + Math.random() * 0.01;
    setLocations([...locations, { name: input, lat, lng }]);
    setInput("");
  };

  return (
    <div style={{ height: `calc(100vh - ${toolbarHeight}px)` }}>
      <MapContainer
        center={[52.52, 13.405]}
        zoom={10}
        className="fullscreen-map"
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
