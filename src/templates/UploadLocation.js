import React, { useState } from "react";

function UploadLocation() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);

    const response = await fetch("http://localhost:8080/api/locations", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Upload erfolgreich!");
    } else {
      alert("Fehler beim Hochladen");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <input type="text" placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Beschreibung" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Hochladen</button>
    </form>
  );
}

export default UploadLocation;
