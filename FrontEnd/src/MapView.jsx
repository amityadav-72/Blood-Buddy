import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

//////////////////////////////////////////////////////
// 🗣 SPEAK
//////////////////////////////////////////////////////
const speak = (text) => {
  if (!text) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-IN";
  window.speechSynthesis.speak(utter);
};

//////////////////////////////////////////////////////
// 🧭 TURN ARROW
//////////////////////////////////////////////////////
const getDirectionArrow = (text = "") => {
  text = text.toLowerCase();

  if (text.includes("left")) return "⬅️";
  if (text.includes("right")) return "➡️";
  if (text.includes("u-turn")) return "🔄";
  if (text.includes("head")) return "⬆️";

  return "⬆️";
};

//////////////////////////////////////////////////////
// 📍 USER MARKER
//////////////////////////////////////////////////////
function SmoothUserMarker({ userLocation }) {
  const markerRef = useRef();

  useEffect(() => {
    if (markerRef.current && userLocation) {
      markerRef.current.setLatLng([userLocation.lat, userLocation.lon]);
    }
  }, [userLocation]);

  if (!userLocation) return null;

  return (
    <>
      <CircleMarker
        center={[userLocation.lat, userLocation.lon]}
        radius={40}
        pathOptions={{
          color: "#2563eb",
          fillColor: "#3b82f6",
          fillOpacity: 0.15,
        }}
      />

      <Marker
        position={[userLocation.lat, userLocation.lon]}
        ref={markerRef}
        icon={L.divIcon({
          html: `<div class="pulse-dot"></div>`,
          className: "",
          iconSize: [20, 20],
        })}
      >
        <Popup>You are here</Popup>
      </Marker>
    </>
  );
}

//////////////////////////////////////////////////////
// 🩸 BLOOD ICON
//////////////////////////////////////////////////////
const getBloodIcon = (group, selected) =>
  L.divIcon({
    html: `<div class="blood-marker ${selected ? "selected" : ""}">${group}</div>`,
    className: "",
    iconSize: [40, 40],
  });

//////////////////////////////////////////////////////
// 🔄 RECENTER
//////////////////////////////////////////////////////
function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) map.setView(center, 15, { animate: true });
  }, [center, map]);

  return null;
}

//////////////////////////////////////////////////////
// 🚗 ROUTING
//////////////////////////////////////////////////////
function RoutingMachine({ userLocation, donor, setRouteInfo, setSteps }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!map || !userLocation || !donor) return;

    if (!routingRef.current) {
      routingRef.current = L.Routing.control({
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: false,
        createMarker: () => null,
      })
        .on("routesfound", (e) => {
          const route = e.routes[0];

          setRouteInfo({
            distance: (route.summary.totalDistance / 1000).toFixed(2),
            time: Math.round(route.summary.totalTime / 60),
          });

          setSteps(route.instructions);
        })
        .addTo(map);
    }

    routingRef.current.setWaypoints([
      L.latLng(userLocation.lat, userLocation.lon),
      L.latLng(donor.latitude, donor.longitude),
    ]);
  }, [userLocation, donor, map]);

  return null;
}

//////////////////////////////////////////////////////
// 🗺 MAIN
//////////////////////////////////////////////////////
export default function MapView({
  donors = [],
  center,
  userLocation,
  selectedDonor,
}) {
  const [routeInfo, setRouteInfo] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(null);
  const [navMode, setNavMode] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  //////////////////////////////////////////////////////
  // STEP CHANGE
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (steps.length > 0) {
      setCurrentStep(steps[0]);

      if (voiceEnabled && navMode) {
        speak(steps[0].text);
      }
    }
  }, [steps, voiceEnabled, navMode]);

  //////////////////////////////////////////////////////
  // COMPASS
  //////////////////////////////////////////////////////
  useEffect(() => {
    const handleOrientation = (e) => {
      if (!navMode) return;

      const heading = e.alpha;
      const mapPane = document.querySelector(".leaflet-map-pane");

      if (mapPane) {
        mapPane.style.transform = `rotate(${-heading}deg)`;
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, [navMode]);

  if (!center) return <p>Loading map...</p>;

  return (
    <div className="relative">

      {/* NAV + VOICE BUTTONS */}
      <div className="absolute top-4 right-4 flex gap-2 z-[1200]">
        <button
          onClick={() => setNavMode(!navMode)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow"
        >
          {navMode ? "Exit Nav" : "Start Nav"}
        </button>

        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`px-4 py-2 rounded-lg shadow ${
            voiceEnabled ? "bg-green-600 text-white" : "bg-white"
          }`}
        >
          🔊
        </button>
      </div>

      <MapContainer
        center={center}
        zoom={13}
        preferCanvas
        style={{
          height: navMode ? "100vh" : "500px",
          width: "100%",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <SmoothUserMarker userLocation={userLocation} />

        {donors.map((d, i) => (
          <Marker
            key={i}
            position={[d.latitude, d.longitude]}
            icon={getBloodIcon(
              d.blood_group,
              selectedDonor?.contact === d.contact
            )}
          />
        ))}

        <RecenterMap center={center} />

        {userLocation && selectedDonor && (
          <RoutingMachine
            userLocation={userLocation}
            donor={selectedDonor}
            setRouteInfo={setRouteInfo}
            setSteps={setSteps}
          />
        )}
      </MapContainer>

      {/* 🧭 TOP INSTRUCTION */}
      {navMode && currentStep && (
        <div className="absolute top-0 left-0 w-full flex justify-center z-[1100]">
          <div className="mt-2 w-[95%] max-w-2xl bg-red-600 text-white rounded-xl shadow-lg px-4 py-3 flex items-center justify-center gap-3">

            <span className="text-2xl">
              {getDirectionArrow(currentStep.text)}
            </span>

            <span className="font-semibold text-sm md:text-base">
              {currentStep.text}
            </span>

          </div>
        </div>
      )}

      {/* 📍 BOTTOM CARD */}
      {selectedDonor && routeInfo && (
        <div className="absolute bottom-0 left-0 w-full bg-white shadow-2xl p-4 rounded-t-2xl flex justify-between items-center">
          <div>
            <h3 className="font-bold text-red-600 text-lg">
              {selectedDonor.name}
            </h3>
            <p className="text-sm text-gray-600">
              🩸 {selectedDonor.blood_group}
            </p>
            <p className="text-sm text-gray-600">
              🚗 {routeInfo.distance} km • ⏱ {routeInfo.time} min
            </p>
          </div>

          <a
            href={`tel:${selectedDonor.contact}`}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Call
          </a>
        </div>
      )}
    </div>
  );
}
