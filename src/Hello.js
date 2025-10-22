import React, { useState } from "react";

function Hello() {
  const [name, setName] = useState("");

  // Event-Handler für Eingabe
  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div style={{ margin: "20px" }}>
      <input
        type="text"
        placeholder="Gib deinen Namen ein"
        value={name}
        onChange={handleChange}
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <p>Hallo {name ? name : "..."}</p>
    </div>
  );
}

export default Hello;
