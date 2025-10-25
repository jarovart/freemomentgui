import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export function LocationCard({ location, onClick }) {
  return (
    <Card
      onClick={() => onClick(location)}
      sx={{ cursor: "pointer" }}
    >
      <CardMedia
        component="img"
        height="140"
        image={location.image}
        alt={location.name}
      />
      <CardContent>
        <Typography variant="h6">{location.name}</Typography>
        <Typography variant="body2">{location.address}</Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(location.date).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
