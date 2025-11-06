import { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import { useAuth } from "../AuthContext"; // Pfad anpassen

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  p: 4,
};

const styleOld = {
  position: 'absolute',
  top: '10%',
  left: '10%',
  width: '80%',
  height: '80%',
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px'
};


export default function LoginModal({ loginOpen, setLoginOpen, setUser }) {
  const [activeTab, setActiveTab] = useState(0); // 0 = Login, 1 = Register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, login } = useAuth(); // <--- hier bekommst du den aktuellen User

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("Bitte Benutzername und Passwort eingeben");
      return;
    }

    if (activeTab === 1 && password !== confirmPassword) {
      setError("Passwörter stimmen nicht überein");
      return;
    }

    setLoading(true);

    const endpoint =
      activeTab === 0
        ? "http://localhost:8080/api/auth/login"
        : "http://localhost:8080/api/auth/register";

    const body = JSON.stringify({ username, password });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const data = await response.json();

      if (response.ok) {
        if (activeTab === 0) {
          // ✅ Login erfolgreich
          localStorage.setItem("token", data.token);
          setUser({ name: data.username, image: "" });
          setLoginOpen(false);
          login({name: data.username});
        } else {
          // ✅ Registrierung erfolgreich
          setSuccess("Registrierung erfolgreich! Du kannst dich jetzt einloggen.");
          setActiveTab(0);
          setUsername("");
          setPassword("");
          setConfirmPassword("");
        }
      } else {
        setError(data.message || "Fehler beim Login/Registrieren");
      }
    } catch (err) {
      console.error(err);
      setError("Serverfehler oder keine Verbindung");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
      <Box sx={style}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => {
            setError("");
            setSuccess("");
            setActiveTab(newValue);
          }}
          centered
        >
          <Tab label="Login" />
          <Tab label="Registrieren" />
        </Tabs>

        {activeTab === 0 && (
          <>
            <TextField
              fullWidth
              label="Benutzername"
              variant="outlined"
              margin="dense"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Passwort"
              type="password"
              variant="outlined"
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        {activeTab === 1 && (
          <>
            <TextField
              fullWidth
              label="Benutzername"
              variant="outlined"
              margin="dense"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Passwort"
              type="password"
              variant="outlined"
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Passwort bestätigen"
              type="password"
              variant="outlined"
              margin="dense"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : activeTab === 0 ? (
              "Einloggen"
            ) : (
              "Registrieren"
            )}
          </Button>
        </Box>

        {activeTab === 0 && (
          <Button variant="text" sx={{ mt: 2 }} fullWidth>
            Passwort vergessen?
          </Button>
        )}
      </Box>
    </Modal>
  );
}