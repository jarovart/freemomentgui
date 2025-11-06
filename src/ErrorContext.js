import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const hideTimeout = useRef(null);
  const hoverRef = useRef(false);

  // Error anzeigen
  const showError = (message, duration = 4000) => {
    setError(message);
    setVisible(true);

    clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      if (!hoverRef.current) {
        setVisible(false);
      }
    }, duration);
  };

  // Hoversteuerung
  const handleMouseEnter = () => {
    hoverRef.current = true;
    clearTimeout(hideTimeout.current);
  };

  const handleMouseLeave = () => {
    hoverRef.current = false;
    hideTimeout.current = setTimeout(() => setVisible(false), 2000);
  };

  const contextValue = { showError };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
      {visible && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 80, 80, 0.9)",
            color: "white",
            padding: "20px 30px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            zIndex: 9999,
            maxWidth: "80%",
            textAlign: "center",
            userSelect: "text", // ✅ Text kopierbar/markierbar
            cursor: "text",
            transition: "opacity 0.3s ease",
          }}
        >
          <strong>Fehler:</strong>
          <p style={{ marginTop: "8px", whiteSpace: "pre-wrap" }}>{error}</p>
        </div>
      )}
    </ErrorContext.Provider>
  );
}

export const useError = () => useContext(ErrorContext);
