import { useState } from "react";
import { Grid, Box } from "@mui/material";
import { LayoutSwitcher } from "../templates/LayoutSwitcher"
import { LocationCard } from "../templates/LocationCard";

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
}
