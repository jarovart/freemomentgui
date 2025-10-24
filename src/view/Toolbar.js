import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top bar */}
      <AppBar position="static">
        <Toolbar>

          {/* Menu button */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FreeMoment
          </Typography>

          {/* Right side */}
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

      {/* Drawer (links aufklappend) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Locations" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Settings" />
            </ListItem>

            {user && (
              <ListItem button>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>

      {/* Login Modal */}
      <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
        <Box sx={style}>
          <h2>Login</h2>
          <p>(Hier kommen Username & Password Inputs)</p>
          <Button variant="contained" onClick={() => {
            setUser({ name: "Artem", image: "" });
            setLoginOpen(false);
          }}>
            Einloggen (Dummy)
          </Button>
          <br /><br />
          <Button variant="text">
            Passwort vergessen
          </Button>
        </Box>
      </Modal>

    </Box>
  );
}