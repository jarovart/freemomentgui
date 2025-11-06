import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Pfad anpassen
import LocationDateSlider from "../templates/LocationDateSlider";
import LocateControl from "../templates/LocationLocator";
import { useError } from "../ErrorContext";
import "leaflet/dist/leaflet.css"; // Leaflet selbst zuerst laden!
import L from "leaflet";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet.locatecontrol"; 
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";


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

function MapWithLongClick() {
  const { showError } = useError();
  const { user } = useAuth(); // <--- hier bekommst du den aktuellen User
  const navigate = useNavigate();
  const clickTimeout = useRef(null);
  const longPressDuration = 600; // ms (wie lange gedrückt halten = Long Click)

  function startListening(e){
    return setTimeout(() => {
          if (!user) {
            console.log("⚠️ Nicht eingeloggt! Navigation blockiert.");
            showError("Bitte logge dich ein, um eine Location zu erstellen.");
            return; // Abbruch
          }
          const { lat, lng } = e.latlng;
          console.log("Long click bei:", lat, lng);
          navigate(`/createlocationpage?lat=${lat}&lng=${lng}`);
        }, longPressDuration);
  }

  // Custom Hook für Map Events
  useMapEvents({
    mousedown(e) {
      // Timer starten
      clickTimeout.current = startListening(e);
    },
    mouseup() {
      // Wenn man vorzeitig loslässt → kein Long Click
      clearTimeout(clickTimeout.current);
    },
    mouseout() {
      // Wenn Maus die Karte verlässt → abbrechen
      clearTimeout(clickTimeout.current);
    },
    mousemove(){
      clearTimeout(clickTimeout.current);
    },
    touchstart(e) {
      clickTimeout.current = startListening(e);
    },
    touchMove(){
      clearTimeout(clickTimeout.current);
    },
    touchend(){
      clearTimeout(clickTimeout.current);
    }
  });

  return null;
}

function LocateButton() {
  const map = useMap();

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation wird nicht unterstützt.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.flyTo([latitude, longitude], 13);
      },
      (error) => {
        console.error("Fehler beim Abrufen der Geolocation:", error);
      }
    );
  };

  return (
    <button
      onClick={handleLocate}
      style={{
        position: "absolute",
        bottom: "50px",
        right: "10px",
        zIndex: 1000,
        padding: "8px 12px",
        borderRadius: "8px",
      }}
    >
      📍 Position
    </button>
  );
}

function ZoomToUserLocation() {
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation wird nicht unterstützt");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Aktuelle Position:", latitude, longitude);
        map.setView([latitude, longitude], 13); // Zoom-Level 13 = Stadtbereich
      },
      (error) => {
        console.error("Fehler beim Abrufen der Geolocation:", error);
      }
    );
  }, [map]);

  return null;
}

function LocationApp() {
  // Flag, damit der erste Aufruf nur einmal passiert
  const hasLoadedInitially = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [locations, setLocations] = useState([]);
  const [input, setInput] = useState("");
  const [dateFilter, setDateFilter] = useState(0);

  const addLocation = () => {
    if (!input.trim()) return;
    const lat = 52.52 + Math.random() * 0.01;
    const lng = 13.405 + Math.random() * 0.01;
    setLocations([...locations, { name: input, latitude: lat, longitude: lng }]);
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

  function MapEventHandler() {
    const { showError } = useError();
    const map = useMapEvents({
      moveend: async () => {
        await loadLocations();
      },
    });

    async function loadLocations() {
      if (!map) return;
      const bounds = map.getBounds();

      const southWest = bounds.getSouthWest();
      const northEast = bounds.getNorthEast();

      try{
        // Anfrage an Spring Boot senden
        const response = await fetch(
          `http://localhost:8080/api/locations/within?minLat=${southWest.lat}&maxLat=${northEast.lat}&minLng=${southWest.lng}&maxLng=${northEast.lng}`
        );

        if (response.ok) {
          const data = await response.json();
          setLocations(data);
        } else {
          console.error("Fehler beim Laden der Locations");
        }
    } catch (err) {
      console.error(err);
      showError("Server is not reachable: "+err.message);
    }
  }


    // 🔥 Beim ersten Rendern direkt laden:
    useEffect(() => {    
    if (!hasLoadedInitially.current) {
      hasLoadedInitially.current = true;
      loadLocations();
    }
    }, []); // nur 1x beim Start

    return null;
  }

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
        <ZoomToUserLocation />
        {locations.map((loc, index) => (
          <Marker key={index} position={[loc.latitude, loc.longitude]}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
          { /* <LocateControl /> */ }
          <LocateButton />
          <MapWithLongClick />
          <MapEventHandler />
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
    </Box>
  );
}

export default LocationApp;
