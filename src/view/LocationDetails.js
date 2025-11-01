import { useLocation, useParams } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function LocationDetails({ location }) {
  const { state } = useLocation();
  const { id } = useParams();

  // Falls Seite direkt geladen wird (ohne state)
  if (!state) return <p>Keine Daten für Location {id} gefunden.</p>;

  return (
    <>
    <Box
        key={state.id}
        sx={{
          display: "flex",            // ordnet Bild und Text nebeneinander
          backgroundColor: "#f9f9f9",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          margin: 2
      }}
    >
    {/* Bild links */}
      <img
        src="../../logo192.png"
        alt="Bremen"
        style={{
          width: "120px",
          height: "auto",
          borderRadius: "8px",
          marginRight: "15px", // Abstand zwischen Bild und Text
          objectFit: "cover",
        }}
      />
      <div style={{ 
          flexDirection: "column", 
          flex: 1,              // <-- passt sich an Parent-Größe an
          whiteSpace: "nowrap",      // kein Zeilenumbruch
          overflow: "hidden",         // überlaufenden Text verstecken
        }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
          {state.name}
        </h2>
        <p style={{ margin: 0, color: "#555" }}>
          {state.address}
        </p>
        <p style={{ margin: 0, fontSize: "14px", color: "#777" }}>
          {state.date}
        </p>
      </div>
      
    </Box>
    <img
        src={state.img}
        alt={state.title}
        style={{
          width: "300px",
          borderRadius: "12px",
          objectFit: "cover",
          marginBottom: "20px",
        }}
      />
      <Typography variant="h4" gutterBottom>{state.name}</Typography>
      <Typography variant="body1">{state.address}</Typography>
      </>
        
    /*<Box sx={{ p: 2 }}>
      <Typography variant="h4">{location.name}</Typography>
      <img src={location.image} style={{ width: "100%", borderRadius: 8 }} />
      <Typography>{location.address}</Typography>
      <Typography>
        {new Date(location.date).toLocaleDateString()}
      </Typography>
    </Box>*/
  );
}
