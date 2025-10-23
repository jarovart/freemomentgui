import React, { useState } from "react";

function Hello({firstNameEmptyValue ="...", secondNameEmptyValue= "..."}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div style={{ margin: "20px" }}>
      <input
        type="text"
        placeholder="Vorname"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Nachname"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <p>
        Hallo {firstName || firstNameEmptyValue} {lastName || secondNameEmptyValue} 👋
      </p>
    </div>
  );
}

export default Hello;
