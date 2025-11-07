import CustomizedSlider from "../templates/Sliders";

export default function TestingPage() {
  return (
    <div style={{ padding: "20px" , backgroundColor: 'rgba(143, 143, 143, 0.7)'}}>
      <h2>Willkommen auf deinem TestProfil!</h2>
      <p>Hier kannst du Benutzerdaten anzeigen und bearbeiten.</p>
      <CustomizedSlider />
    </div>
  );
}