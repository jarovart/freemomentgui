import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LocationApp from "./view/LocationApp";
import CustomToolbar from "./view/Toolbar";
import Profile from "./view/Profile";
import LocationsPage from "./view/LocationsPage";
import CreateLocationPage from "./view/CreateLocationPage";
import LocationDetails from "./view/LocationDetails";
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./AuthContext";
import { ErrorProvider } from "./ErrorContext";

import 'leaflet/dist/leaflet.css';
import "./index.css";

function Root() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      {/* Toolbar immer sichtbar */}
      <React.StrictMode>
        <AuthProvider>
          <ErrorProvider>
            <CustomToolbar />
            <Routes>
              <Route path="/" element={<LocationApp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/locationspage" element={<LocationsPage />} />
              <Route path="/createlocationpage" element={<CreateLocationPage />} />
              <Route path="/location/:id" element={<LocationDetails />} />
            </Routes>
          </ErrorProvider>
        </AuthProvider>
      </React.StrictMode>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
