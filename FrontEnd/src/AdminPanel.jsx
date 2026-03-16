import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminPanel() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [section, setSection] = useState("dashboard");

  const [search, setSearch] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [editingDonor, setEditingDonor] = useState(null);

  const API = "http://127.0.0.1:8000";

  // ===============================
  // Fetch Donors
  // ===============================
  const fetchDonors = () => {
    fetch(`${API}/admin/donors`)
      .then((res) => res.json())
      .then((data) => {
        setDonors(data);
        setFilteredDonors(data);
      });
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // ===============================
  // Live Search
  // ===============================
  useEffect(() => {
    const result = donors.filter((donor) => {
      return (
        (!search ||
          donor.name?.toLowerCase().includes(search.toLowerCase())) &&
        (!bloodFilter ||
          donor.blood_group?.toLowerCase() === bloodFilter.toLowerCase()) &&
        (!locationFilter ||
          donor.location?.toLowerCase().includes(locationFilter.toLowerCase()))
      );
    });

    setFilteredDonors(result);
  }, [search, bloodFilter, locationFilter, donors]);

  // ===============================
  // Delete
  // ===============================
  const deleteDonor = async (id) => {
    await fetch(`${API}/admin/delete/${id}`, {
      method: "DELETE",
    });

    fetchDonors();
  };

  // ===============================
  // Edit Save
  // ===============================
  const saveEdit = async () => {
    await fetch(`${API}/admin/update/${editingDonor._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingDonor),
    });

    setEditingDonor(null);
    fetchDonors();
  };

  // ===============================
  // Chart Data
  // ===============================
  const chartData = {
    labels: ["O+", "A+", "B+", "AB+"],
    datasets: [
      {
        data: [
          donors.filter((d) => d.blood_group === "O+").length,
          donors.filter((d) => d.blood_group === "A+").length,
          donors.filter((d) => d.blood_group === "B+").length,
          donors.filter((d) => d.blood_group === "AB+").length,
        ],
      },
    ],
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fb" }}>
      {/* Sidebar */}
      <div style={sidebar}>
        <h2>BloodBuddy Admin</h2>

        <p onClick={() => setSection("dashboard")} style={menu}>Dashboard</p>
        <p onClick={() => setSection("donors")} style={menu}>Donors</p>
        <p onClick={() => setSection("analytics")} style={menu}>Analytics</p>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "30px" }}>
        {/* Dashboard */}
        {section === "dashboard" && (
          <>
            <h1>Dashboard Overview</h1>

            <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
              <div style={card}>
                <h3>Total Donors</h3>
                <p>{donors.length}</p>
              </div>

              <div style={card}>
                <h3>O+ Donors</h3>
                <p>{donors.filter((d) => d.blood_group === "O+").length}</p>
              </div>

              <div style={card}>
                <h3>A+ Donors</h3>
                <p>{donors.filter((d) => d.blood_group === "A+").length}</p>
              </div>
            </div>
          </>
        )}

        {/* Donors */}
        {section === "donors" && (
          <>
            <h1>Donor Management</h1>

            <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
              <input
                placeholder="Search donor"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={input}
              />

              <select
                value={bloodFilter}
                onChange={(e) => setBloodFilter(e.target.value)}
                style={input}
              >
                <option value="">Blood Group</option>
                <option>O+</option>
                <option>A+</option>
                <option>B+</option>
                <option>AB+</option>
              </select>

              <input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                style={input}
              />
            </div>

            <table style={table}>
              <thead>
                <tr style={{ background: "#d62828", color: "white" }}>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Location</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDonors.map((donor) => (
                  <tr key={donor._id}>
                    <td>{donor.name}</td>
                    <td>{donor.blood_group}</td>
                    <td>{donor.location}</td>
                    <td>{donor.phone}</td>

                    <td>
                      <button
                        onClick={() => setEditingDonor(donor)}
                        style={editBtn}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteDonor(donor._id)}
                        style={deleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Analytics */}
        {section === "analytics" && (
          <>
            <h1>Blood Group Analytics</h1>

            <div style={{ width: "350px", background: "white", padding: "20px" }}>
              <Pie data={chartData} />
            </div>
          </>
        )}

        {/* Edit Modal */}
        {editingDonor && (
          <div style={modal}>
            <div style={modalBox}>
              <h3>Edit Donor</h3>

              <input
                value={editingDonor.name}
                onChange={(e) =>
                  setEditingDonor({
                    ...editingDonor,
                    name: e.target.value,
                  })
                }
                style={input}
              />

              <input
                value={editingDonor.location}
                onChange={(e) =>
                  setEditingDonor({
                    ...editingDonor,
                    location: e.target.value,
                  })
                }
                style={input}
              />

              <button onClick={saveEdit} style={editBtn}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const sidebar = {
  width: "240px",
  background: "#d62828",
  color: "white",
  padding: "30px",
};

const menu = {
  cursor: "pointer",
  marginTop: "20px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  minWidth: "180px",
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const editBtn = {
  background: "#0d6efd",
  color: "white",
  border: "none",
  padding: "8px 14px",
  marginRight: "8px",
  borderRadius: "8px",
};

const deleteBtn = {
  background: "#dc3545",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
};

const table = {
  width: "100%",
  background: "white",
  borderCollapse: "collapse",
};

const modal = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
};

const modalBox = {
  background: "white",
  padding: "20px",
  width: "300px",
  margin: "100px auto",
};

export default AdminPanel;