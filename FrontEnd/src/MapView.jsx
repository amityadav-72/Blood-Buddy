import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// 📍 USER LOCATION ICON (Pulsing dot style)
const userIcon = L.divIcon({
  className: "custom-user-marker",
  html: `<div class="pulse"></div>`,
  iconSize: [20, 20],
});

// 🩸 BLOOD GROUP ICON
const getBloodIcon = (group) =>
  L.divIcon({
    className: "blood-marker",
    html: `<div class="marker">${group}</div>`,
    iconSize: [40, 40],
  });

// 🔄 RECENTER
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13, { animate: true });
  }, [center]);
  return null;
}

// 🚗 ROUTING
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
        styles: [
          { color: "#000", weight: 7, opacity: 0.2 },
          { color: "#d90429", weight: 5, opacity: 1 },
        ],
      },

      createMarker: () => null, // ❌ remove default markers
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    // ✅ SHOW DISTANCE + TIME
    routingControl.on("routesfound", function (e) {
      const route = e.routes[0];
      const distance = (route.summary.totalDistance / 1000).toFixed(2);
      const time = Math.round(route.summary.totalTime / 60);

      const center = route.coordinates[
        Math.floor(route.coordinates.length / 2)
      ];

      L.popup({ closeButton: false })
        .setLatLng(center)
        .setContent(`
  <div style="
    background:white;
    padding:6px 12px;
    border-radius:8px;
    font-weight:600;
    color:#d90429;
  ">
    🚗 ${distance} km • ⏱ ${time} mins
  </div>
`)

        .openOn(map);
    });

    return () => map.removeControl(routingControl);
  }, [userLocation, donor, map]);

  return null;
};



const MapView = ({ donors = [], center, userLocation, selectedDonor }) => {
  if (!center) return <p>Loading map...</p>;

  return (
    <MapContainer center={center} zoom={13} style={{ height: "500px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* USER */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {/* DONORS */}
      {donors.map((d, i) => (
        <Marker
          key={i}
          position={[d.latitude, d.longitude]}
          icon={getBloodIcon(d.blood_group)}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-red-600">{d.name}</h3>
              <p>🩸 {d.blood_group}</p>
              <p>{d.contact}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      <RecenterMap center={center} />

      {userLocation && selectedDonor && (
        <RoutingMachine userLocation={userLocation} donor={selectedDonor} />
      )}
    </MapContainer>
  );
};

export default MapView;
