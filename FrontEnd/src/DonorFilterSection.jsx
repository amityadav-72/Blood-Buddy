import React, { useState, useEffect, useRef } from "react";
import MapView from "./MapView";
import axios from "axios";

function DonorFilterSection() {

  const [locationOption, setLocationOption] = useState("auto");
  const [manualLocation, setManualLocation] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [limit, setLimit] = useState(10);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [mapCenter, setMapCenter] = useState([20.9374, 77.7796]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const lastFetchLocation = useRef(null);
  const lastFetchLocationRef = useRef(null);
  

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

  // ✅ LIVE LOCATION TRACKING (moves marker in real time)
  useEffect(() => {
  if (locationOption !== "auto") return;

  const watchId = navigator.geolocation.watchPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      setUserLocation({ lat, lon });
      setMapCenter([lat, lon]);

      // 🚀 AUTO FETCH EVERY 500m
      if (lastFetchLocation.current && bloodGroup) {
        const distance = getDistance(
          lastFetchLocation.current.lat,
          lastFetchLocation.current.lon,
          lat,
          lon
        );

        if (distance >= 0.5) {
          try {
            const donorRes = await axios.get(
              `${process.env.REACT_APP_API_URL}/donors/nearby`,
              {
                params: {
                  lat,
                  lon,
                  blood_group: bloodGroup,
                  limit,
                },
              }
            );

            setDonors(donorRes.data.donors || donorRes.data);
            lastFetchLocation.current = { lat, lon };

            console.log("✅ Auto refreshed after 500m");
          } catch (err) {
            console.log("Auto fetch error", err);
          }
        }
      }
    },
    (err) => console.log(err),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    }
  );

  return () => navigator.geolocation.clearWatch(watchId);
},  [locationOption, bloodGroup, limit]);



  // ✅ FETCH DONORS BUTTON
  const handleFetch = async () => {
    if (locationOption === "manual" && !manualLocation.trim()) {
      alert("Please enter a location!");
      return;
    }

    setLoading(true);

    try {
      let lat, lon;

      if (locationOption === "auto") {
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        lat = position.coords.latitude;
        lon = position.coords.longitude;
      } else {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${manualLocation}`
        );

        if (!res.data.length) throw new Error("Location not found");

        lat = res.data[0].lat;
        lon = res.data[0].lon;
      }

      setMapCenter([parseFloat(lat), parseFloat(lon)]);
      setUserLocation({ lat: parseFloat(lat), lon: parseFloat(lon) });

      const donorRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/donors/nearby`,
        {
          params: { lat, lon, blood_group: bloodGroup, limit },
        }
      );

      setDonors(donorRes.data.donors || donorRes.data);
      lastFetchLocation.current = {
  lat: parseFloat(lat),
  lon: parseFloat(lon),
};


    } catch (err) {
      console.error(err);
      alert("Error fetching donors");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="bg-gray-50 py-10">

      <div className="max-w-6xl mx-auto px-4">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          🩸 Find Blood Donors Near You
        </h2>

        {/* FILTER CARD */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-wrap gap-4 justify-center items-center">

          <div className="flex gap-3">
            <label>
              <input
                type="radio"
                value="auto"
                checked={locationOption === "auto"}
                onChange={(e) => setLocationOption(e.target.value)}
              />
              <span className="ml-2">Use My Location</span>
            </label>

            <label>
              <input
                type="radio"
                value="manual"
                checked={locationOption === "manual"}
                onChange={(e) => setLocationOption(e.target.value)}
              />
              <span className="ml-2">Manual</span>
            </label>
          </div>

          {locationOption === "manual" && (
            <input
              type="text"
              placeholder="Enter city"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          )}

          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border rounded-lg px-3 py-2"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

          <button
            onClick={handleFetch}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700"
          >
            {loading ? "Searching..." : "Find Donors"}
          </button>
        </div>

        {/* MAP */}
        <div className="mt-10 rounded-xl overflow-hidden shadow-md">
          <MapView
            donors={donors}
            center={mapCenter}
            userLocation={userLocation}
            selectedDonor={selectedDonor}
          />
        </div>

        {/* DONOR LIST */}
        {donors.length > 0 && (
          <div className="mt-12 bg-white p-6 rounded-xl shadow-md">

            <h3 className="text-xl font-bold mb-4 text-center">
              Nearby Donors
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-center border">

                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="p-3">Name</th>
                    <th>City</th>
                    <th>Distance</th>
                    <th>Contact</th>
                  </tr>
                </thead>

                <tbody>
                  {donors.map((donor, index) => (
                    <tr
                      key={index}
                      onClick={() => setSelectedDonor(donor)}
                      className={`border-b cursor-pointer hover:bg-red-50 ${
                        selectedDonor?.name === donor.name && "bg-red-100"
                      }`}
                    >
                      <td className="p-2">{donor.name}</td>
                      <td>{donor.city}</td>
                      <td>{donor.distance_km || "—"}</td>
                      <td className="text-blue-600">{donor.contact}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}

        {/* eRaktKosh SECTION */}
        {bloodGroup && (
          <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6 text-center">

            <h3 className="text-2xl font-bold text-red-700 mb-3">
              🏥 Need More Donors?
            </h3>

            <p className="text-gray-700 mb-4">
              Check live government blood stock for
              <span className="font-semibold"> {bloodGroup} </span>
              in <strong>Maharashtra → Amravati</strong>
            </p>

            <button
              onClick={() =>
                window.open(
                  "https://eraktkosh.mohfw.gov.in/eraktkoshPortal/#/publicPages/bloodAvailabilitySearch",
                  "_blank"
                )
              }
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700"
            >
              View on eRaktKosh →
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default DonorFilterSection;
