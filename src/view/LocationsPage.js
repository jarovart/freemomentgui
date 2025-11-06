import React, { useEffect, useState } from "react";
import { LayoutSwitcher } from "../templates/LayoutSwitcher"
import { LocationCard } from "../templates/LocationCard";
import { LocationItem } from "../templates/LocationItem";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

const locations1 = [
  {
    id: 1,
    name: "Marienplatz",
    address: "Marienplatz 1, München",
    date: "2025-04-22T00:00:00",
    image: "/images/marienplatz.jpg"
  },
  {
    id: 2,
    name: "Brandenburger Tor",
    address: "Pariser Platz, Berlin",
    date: "2025-05-01T00:00:00",
    image: "/images/brandenburger.jpg"
  },  
  {
    id: 3,
    name: "Marienplatz1",
    address: "Marienplatz 1, München",
    date: "2025-04-22T00:00:00",
    image: "/images/marienplatz.jpg"
  },
  {
    id: 4,
    name: "Brandenburger Tor1",
    address: "Pariser Platz, Berlin",
    date: "2025-05-01T00:00:00",
    imageUrl: "/images/brandenburger.jpg"
  }
];

export default function LocationsPage({ locations2=locations1 }) {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  console.debug("Erfolgreich gespeichert:");
  // Anfrage an Spring Boot senden
   useEffect(() => {
    // Daten laden (einmal beim Mount)
    fetch("http://localhost:8080/api/locations")
      .then((res) => {
        if (!res.ok) throw new Error("Server-Fehler " + res.status);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Locations geladen:", data);
        setLocations(data);
      })
      .catch((err) => console.error("❌ Fehler beim Laden:", err));
  }, []); // <- leeres Array = nur einmal beim Laden der Seite

  return (
    <Box
      sx={{
        height: `calc(100vh - 64px)`,
        backgroundColor: 'rgba(143, 143, 143, 0.7)',
        overflowY: "auto",
        overflow: "auto",
      }}
    >
      {locations.map((location, index) => (
      <LocationItem location={location}/>
      ))}
    </Box>
  );
}


/*export default function LocationsPage({ locations=locations1 }) {
  const [view, setView] = useState(2); // default: 2 pro Reihe
  const openLocation = (loc) => {
    console.log("Open details:", loc);
    // navigate(`/location/${loc.id}`)
  };

  return (
    <Box sx={{ p: 2 }}>
      
      <LayoutSwitcher view={view} setView={setView} />

      <Grid container spacing={2}>
        {locations.map((loc) => (
          <Grid
            item
            xs={12}
            sm={view === 3 ? 4 : view === 2 ? 6 : 12}
            key={loc.id}
          >
            <LocationCard location={loc} onClick={openLocation} />
          </Grid>
        ))}
      </Grid>

    </Box>
  );
}*/
