import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <MapContainer center={[48.8566, 2.3522]} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={[48.8566, 2.3522]}>
            <Popup>Paris</Popup>
          </Marker>
        </MapContainer>
      </div>
  );
}
