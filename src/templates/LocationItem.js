import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

export function LocationItem({ location, onClick }) {
  return (
    <Box
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

      {/* Texte rechts */}
        <div style={{ 
          flexDirection: "column", 
          flex: 1,              // <-- passt sich an Parent-Größe an
          whiteSpace: "nowrap",      // kein Zeilenumbruch
          overflow: "hidden",         // überlaufenden Text verstecken
        }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
          Bremer Stadtmusikanten asdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1234
        </h2>
        <p style={{ margin: 0, color: "#555" }}>
          Berühmtes Wahrzeichen der Stadt Bremen.
        </p>
        <p style={{ margin: 0, fontSize: "14px", color: "#777" }}>
          Geöffnet: täglich von 9–18 Uhr
        </p>
      </div>
      </Box>
  );
}