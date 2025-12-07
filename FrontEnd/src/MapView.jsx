import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// ======================================
// 🔧 FIX DEFAULT MARKER BUG
// ======================================
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 🔴 Custom RED marker for user-selected location
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ======================================
// 🔄 Recenter Map on new center value
// ======================================
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 13);
  }, [center, map]);

  return null;
}

// ======================================
// 🚗 ROUTE DRAWING COMPONENT
// ======================================
const RoutingMachine = ({ userLocation, donor }) => {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !donor) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lon),
        L.latLng(donor.latitude, donor.longitude),
      ],
      lineOptions: {
        styles: [{ color: "red", weight: 4 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      fitSelectedRoutes: true,
    }).addTo(map);

    // Cleanup route when donor changes
    return () => map.removeControl(routingControl);
  }, [userLocation, donor, map]);

  return null;
};

// ======================================
// 🗺 MAIN MAP VIEW COMPONENT
// ======================================
const MapView = ({ donors = [], center, userLocation, selectedDonor }) => {
  if (!center) return <p style={{ textAlign: "center" }}>Fetching location...</p>;

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      {/* 🌍 Map Tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      {/* 🔴 Center Marker */}
      <Marker position={center} icon={redIcon}>
        <Popup>Your Location</Popup>
      </Marker>

      {/* 🩸 Donor markers */}
      {donors.map((donor, idx) => (
        <Marker key={idx} position={[donor.latitude, donor.longitude]}>
          <Popup>
            <strong>{donor.name}</strong> <br />
            Blood Group: {donor.blood_group} <br />
            Contact: {donor.contact}
          </Popup>
        </Marker>
      ))}

      {/* 🔄 Recenter Map */}
      <RecenterMap center={center} />

      {/* 🚗 Draw route when donor is selected */}
      {userLocation && selectedDonor && (
        <RoutingMachine userLocation={userLocation} donor={selectedDonor} />
      )}
    </MapContainer>
  );
};

export default MapView;
