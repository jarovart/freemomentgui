import React, { useState, useRef, useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.locatecontrol"; 
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";

export default function LocateControl() {
  const map = useMap();

  React.useEffect(() => {
    const lc = L.control
      .locate({
        position: "topleft",
        strings: {
          title: "Meine Position anzeigen",
        },
        locateOptions: {
          enableHighAccuracy: true,
        },
      })
      .addTo(map);

    return () => {
      lc.remove();
    };
  }, [map]);

  return null;
}
