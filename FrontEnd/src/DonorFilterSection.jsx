import React, { useState } from "react";
import MapView from "./MapView";
import axios from "axios";

function DonorFilterSection() {
  const [locationOption, setLocationOption] = useState("auto");
  const [manualLocation, setManualLocation] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [limit, setLimit] = useState(10);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Default map center — no location fetching until user clicks
  const [mapCenter, setMapCenter] = useState([20.9374, 77.7796]); // Amravati, Maharashtra

  const handleFetch = async () => {
    // ✅ Prevent fetch when manual selected but no text entered
    if (locationOption === "manual" && !manualLocation.trim()) {
      alert("Please enter a location!");
      return;
    }

    setLoading(true);
    let lat, lon;

    try {
      if (locationOption === "auto") {
        // ✅ Ask for location only when user clicks
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        lat = position.coords.latitude;
        lon = position.coords.longitude;
      } else {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${manualLocation}`
        );
        if (res.data.length === 0) throw new Error("Location not found!");
        lat = res.data[0].lat;
        lon = res.data[0].lon;
      }

      setMapCenter([parseFloat(lat), parseFloat(lon)]);

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
    } catch (error) {
      console.error(error);
      // ✅ Show simple alert only on real error, not empty input
      alert("Error fetching donors. Please check your location or backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: "70px 0 40px", backgroundColor: "#fafafa" }}>
      <div
        className="container"
        style={{
          maxWidth: "1000px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            color: "#d90429",
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          🩸 Find Blood Donors Near You
        </h2>

        {/* === Filter Controls Row === */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            background: "#fff",
            padding: "15px 25px",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          {/* Location Options */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label>
              <input
                type="radio"
                name="locationOption"
                value="auto"
                checked={locationOption === "auto"}
                onChange={(e) => setLocationOption(e.target.value)}
              />{" "}
              Use My Location
            </label>
            <label>
              <input
                type="radio"
                name="locationOption"
                value="manual"
                checked={locationOption === "manual"}
                onChange={(e) => setLocationOption(e.target.value)}
              />{" "}
              Manual
            </label>
          </div>

          {/* Manual Location Input */}
          {locationOption === "manual" && (
            <input
              type="text"
              placeholder="Enter city or address"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "200px",
              }}
            />
          )}

          {/* Blood Group Dropdown */}
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          {/* Limit Dropdown */}
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          {/* Search Button */}
          <button
            onClick={handleFetch}
            disabled={loading}
            style={{
              padding: "10px 22px",
              backgroundColor: "#d90429",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {loading ? "Searching..." : "Find Donors"}
          </button>
        </div>

        {/* === Map === */}
        <div
          style={{
            marginTop: "40px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <MapView donors={donors} center={mapCenter} />
        </div>

        {/* === Donor Table === */}
        {donors.length > 0 && (
          <div style={{ marginTop: "50px", overflowX: "auto" }}>
            <h3
              style={{
                textAlign: "center",
                color: "#222",
                marginBottom: "15px",
                fontWeight: "600",
              }}
            >
              Nearby Donors
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#fff",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <thead style={{ backgroundColor: "#d90429", color: "#fff" }}>
                <tr>
                  <th style={{ padding: "12px" }}>Name</th>
                  <th style={{ padding: "12px" }}>City</th>
                  <th style={{ padding: "12px" }}>Distance (km)</th>
                  <th style={{ padding: "12px" }}>Contact</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, index) => (
                  <tr
                    key={index}
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <td style={{ padding: "10px" }}>{donor.name}</td>
                    <td style={{ padding: "10px" }}>{donor.city}</td>
                    <td style={{ padding: "10px" }}>
                      {donor.distance_km ? donor.distance_km : "—"}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        color: "#0077cc",
                        fontWeight: "500",
                      }}
                    >
                      {donor.contact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default DonorFilterSection;
