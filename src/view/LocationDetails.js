import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function LocationDetails({ location }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">{location.name}</Typography>
      <img src={location.image} style={{ width: "100%", borderRadius: 8 }} />
      <Typography>{location.address}</Typography>
      <Typography>
        {new Date(location.date).toLocaleDateString()}
      </Typography>
    </Box>
  );
}
