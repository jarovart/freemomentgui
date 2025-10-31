import { useState } from "react";
import { LayoutSwitcher } from "../templates/LayoutSwitcher"
import { LocationCard } from "../templates/LocationCard";
import { LocationItem } from "../templates/LocationItem";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

const locations1 = [
  {
    id: 1,
    name: "Marienplatz",
    address: "Marienplatz 1, München",
    date: "2025-04-22",
    image: "/images/marienplatz.jpg"
  },
  {
    id: 2,
    name: "Brandenburger Tor",
    address: "Pariser Platz, Berlin",
    date: "2025-05-01",
    image: "/images/brandenburger.jpg"
  },  
  {
    id: 3,
    name: "Marienplatz1",
    address: "Marienplatz 1, München",
    date: "2025-04-22",
    image: "/images/marienplatz.jpg"
  },
  {
    id: 4,
    name: "Brandenburger Tor1",
    address: "Pariser Platz, Berlin",
    date: "2025-05-01",
    image: "/images/brandenburger.jpg"
  }
];

export default function LocationsPage({ locations=locations1 }) {
  const navigate = useNavigate();

  const openLocation = (id) => {
    navigate(`/location/${id}`);
  };

  return (
    <Box
      sx={{
        height: `calc(100vh - 64px)`,   // Toolbar offset ggf. anpassen
        display: "grid",
        alignItems: "flex-start",   // Text oben am Bild ausrichten
        backgroundColor: 'rgba(143, 143, 143, 0.7)',
        padding: 2,
        gridTemplateColumns: "repeat(2, fr)",
        gridAutoRows: "auto",
        gap: 2,
      }}
    >
      <LocationItem />
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
