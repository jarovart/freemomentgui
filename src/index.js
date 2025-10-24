import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LocationApp from "./view/LocationApp";
import CustomToolbar from "./view/Toolbar";
import Profile from "./view/Profile";
import reportWebVitals from './reportWebVitals';

import 'leaflet/dist/leaflet.css';
import "./index.css";

function Root() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      {/* Toolbar immer sichtbar */}
      <CustomToolbar user={user} setUser={setUser} />
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<LocationApp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
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
