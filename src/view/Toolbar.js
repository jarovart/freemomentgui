import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: 'absolute',
  top: '10%',
  left: '10%',
  width: '80%',
  height: '80%',
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px'
};

export default function CustomToolbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const isMainPage = location.pathname === "/";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Links: Hamburger oder Back */}
          {isMainPage ? (
            <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton edge="start" color="inherit" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
          )}

          {/* Titel */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FreeMoment
          </Typography>

          {/* Rechts: Login oder Avatar */}
          {user ? (
            <IconButton onClick={() => navigate("/profile")}>
              <Avatar alt="User" src={user.image} />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={() => setLoginOpen(true)}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer nur für Hauptseite */}
      {isMainPage && (
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 250 }} role="presentation">
            <List>
              <ListItem button onClick={() => {
                setDrawerOpen(false);
                navigate("/");
              }}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={() => navigate("/profile")}>
                <ListItemText primary="Profil" />
              </ListItem>
              <ListItem button onClick={() => navigate("/locationspage")}>
                <ListItemText primary="LocationPage" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}

      {/* Login Modal */}
      <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
        <Box sx={style}>
          <h2>Login</h2>
          <p>(Username & Password Inputs hier)</p>
          <Button variant="contained" onClick={() => {
            setUser({ name: "Artem", image: "" });
            setLoginOpen(false);
          }}>Einloggen (Dummy)</Button>
          <br /><br />
          <Button variant="text">Passwort vergessen</Button>
        </Box>
      </Modal>
    </Box>
  );
}
