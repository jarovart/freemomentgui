import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate, useLocation } from "react-router-dom";
import LocationDateSlider from "../templates/LocationDateSlider";
import L from "leaflet";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const TOOLBAR_HEIGHT = 64; // px

function useLongPress(callback = () => {}, ms = 500) {
  const timeout = useRef();

  const start = (e) => {
    timeout.current = setTimeout(() => callback(e), ms);
  };

  const clear = () => clearTimeout(timeout.current);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
  };
}

// Marker Fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [locations, setLocations] = useState([]);
  const [input, setInput] = useState("");
  const [dateFilter, setDateFilter] = useState(0);

  const addLocation = () => {
    if (!input.trim()) return;
    const lat = 52.52 + Math.random() * 0.01;
    const lng = 13.405 + Math.random() * 0.01;
    setLocations([...locations, { name: input, lat, lng }]);
    setInput("");
  };

    const marks = [
    { value: 0, label: 'Heute' },
    { value: 1, label: 'Morgen' },
    { value: 2, label: '1 Woche' },
    { value: 3, label: "1 Monat" },
  ];

  const filteredLocations = locations.filter(loc => loc.dateFilter === dateFilter);
  const handleLongPress = (event) => {
    const { lat, lng } = event.latlng;
    console.log("LONG PRESS:", lat, lng);

    navigate("/createlocationpage", {
      state: { lat, lng }
    });
  };

  const longpress = useLongPress(handleLongPress, 600);

  return (
    <Box sx={{ height: `calc(100vh - ${TOOLBAR_HEIGHT}px)`, position: "relative" }}>
      <MapContainer
        {...longpress}
        center={[52.52, 13.405]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((loc, index) => (
          <Marker key={index} position={[loc.lat, loc.lng]}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <Box sx={{
        position: "absolute",
        top: `10px`,          // 10px unter Toolbar
        left: "50%",
        transform: "translateX(-50%)",
        minWidth: "200px", // Lesbarkeit
        width: "30%",
        zIndex: 1001,
        backgroundColor: 'rgba(143, 143, 143, 0.7)',
        borderRadius: "12px",
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 10px"
      }}>
        <input
          type="text"
          placeholder="Ort eingeben"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: '5px', width: '100%', marginRight: '10px' }}
        />
        <button onClick={addLocation}>Hinzufügen</button>
      </Box>
      <LocationDateSlider />
      {/* Overlay: Slider unten */}
      {/*<Box
        sx={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '10%',
          backgroundColor: 'rgba(143, 143, 143, 0.7)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: "10px",
          width: "30%",
          minWidth: "100px", // Lesbarkeit
          minHeight: "70px", // Lesbarkeit
          borderRadius: "12px",   // oder 8, 16 – Geschmackssache
          zIndex: 1000,   // ✅ das ist neu!
          padding: "6px 30px",
          whiteSpace: "nowrap"
        }}
      >
        <Slider
          value={dateFilter}
          min={0}
          max={3}
          step={1}
          marks={marks}
          onChange={(_, newValue) => setDateFilter(newValue)}
          valueLabelDisplay="off"
          //sx={{ left: '10%', width: '80%' }}
        />
      </Box>*/}
    </Box>
  );
}

export default LocationApp;
