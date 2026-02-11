import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";

const BecomeDonor = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    bloodGroup: '',
    mobile: '',
    whatsapp: '',
    address: ''
  });
  
  const [locationStatus, setLocationStatus] = useState('idle');
  const [error, setError] = useState('');
  const [manualAddress, setManualAddress] = useState(false);

 
  const fetchLocation = () => {
    setLocationStatus('pending');
    setError('');
    
    if (!navigator.geolocation) {
      setLocationStatus('unsupported');
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                'User-Agent': 'BloodDonorApp/1.0'
              }
            }
          );
          
          const address = response.data.display_name || 
                         `${response.data.address?.road || ''}, ${response.data.address?.city || ''}, ${response.data.address?.country || ''}`;
          
          if (!address.trim()) {
            throw new Error('No address information found');
          }
          
          setFormData(prev => ({
            ...prev,
            address: address
          }));
          
          setLocationStatus('success');
        } catch (err) {
          console.error('Geocoding error:', err);
          setLocationStatus('error');
          setError('Failed to fetch address details. Please enter manually.');
          setManualAddress(true);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        setLocationStatus('denied');
        setError('Location access denied or failed. Please enable permissions or enter address manually.');
        setManualAddress(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
   
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    let latitude;
    let longitude;

    // ==========================
    // OPTION 1: GPS Location Used
    // ==========================
    if (locationStatus === "success") {
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    }

    // ==========================
    // OPTION 2: Manual Address
    // ==========================
    else {
      if (!formData.address.trim()) {
        throw new Error("Please enter your address.");
      }

      const geoResponse = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            format: "json",
            q: formData.address,
          },
          headers: {
            "User-Agent": "BloodBuddyApp/1.0",
          },
        }
      );

      if (!geoResponse.data.length) {
        throw new Error("Address not found. Please enter valid address.");
      }

      latitude = parseFloat(geoResponse.data[0].lat);
      longitude = parseFloat(geoResponse.data[0].lon);
    }

    // ==========================
    // SEND DATA TO BACKEND
    // ==========================
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/donors/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          blood_group: formData.bloodGroup,
          city: formData.address,
          contact: formData.mobile,
          latitude,
          longitude,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    alert("Registration successful! 🎉");

    setFormData({
      name: "",
      age: "",
      weight: "",
      bloodGroup: "",
      mobile: "",
      whatsapp: "",
      address: "",
    });

    setLocationStatus("idle");

  } catch (err) {
    console.error(err);
    setError(err.message || "Something went wrong");
  }
};



  const enableLocation = () => {
    fetchLocation();
  };

  return (<>
    <Navbar />
    <div className="max-w-6xl mx-auto p-6 pt-24">
      
      <div className="bg-gradient-to-r from-red-500 to-red-400 to-red-300 text-white rounded-2xl p-8 mb-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Become a Life-Saver Today</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Join our community of heroes who are making a difference one donation at a time
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center backdrop-blur-sm">
            <div className="text-3xl mb-3">🩸</div>
            <h3 className="font-bold text-lg mb-2">Every Drop Counts</h3>
            <p className="text-red-100 text-sm">
              A single donation can save up to 3 lives. Your contribution matters more than you think.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center backdrop-blur-sm">
            <div className="text-3xl mb-3">⏰</div>
            <h3 className="font-bold text-lg mb-2">Critical Need</h3>
            <p className="text-red-100 text-sm">
              Blood is needed every 2 seconds. Your timely donation could be someone's lifeline.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center backdrop-blur-sm">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-bold text-lg mb-2">Community Impact</h3>
            <p className="text-red-100 text-sm">
              Join thousands of donors in Vidarbha region creating a safety net for emergencies.
            </p>
          </div>
        </div>
      </div>

    
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-red-100">
        <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">Why Your Donation Matters</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
              Emergency Situations
            </h3>
            <p className="text-gray-600 mb-6">
              Accidents, surgeries, and medical emergencies can happen to anyone at any time. 
              Your registered presence as a donor means that when someone's life hangs in the balance, 
              help is just a click away.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
              Chronic Patients
            </h3>
            <p className="text-gray-600 mb-6">
              Patients with conditions like thalassemia, cancer, and anemia require regular blood 
              transfusions to survive. Your donation provides them with the gift of time and life.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
              Maternal Care
            </h3>
            <p className="text-gray-600">
              Complications during childbirth can lead to severe blood loss. Your donation 
              ensures that mothers receive the life-saving care they need during this critical time.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
              The Blood Shortage Crisis
            </h3>
            <div className="bg-red-50 rounded-xl p-6 mb-6">
              <div className="text-center">
                <span className="text-2xl font-bold text-red-600">40%</span>
                <p className="text-gray-600">Shortage in blood supply across India</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
              Health Benefits for Donors
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Reduces risk of heart disease and liver problems
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Stimulates production of new blood cells
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Free health screening before every donation
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Burns approximately 650 calories per donation
              </li>
            </ul>
          </div>
        </div>
      </div>

    
      <div className="bg-white shadow-lg rounded-lg p-8 border border-red-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          Join Our Life-Saving Community
        </h2>
        
       
        {locationStatus === 'pending' && (
          <div className="mb-6 p-4 bg-yellow-100 rounded-lg flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-yellow-600" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" strokeWidth="4" stroke="currentColor" 
                      strokeDasharray="31.415, 31.415" />
            </svg>
            <span>Detecting your location... Please wait</span>
          </div>
        )}
        
        {locationStatus === 'denied' && (
          <div className="mb-6 p-4 bg-red-100 rounded-lg flex items-center">
            <svg className="h-5 w-5 mr-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        {locationStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-100 rounded-lg flex items-center">
            <svg className="h-5 w-5 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Location detected successfully!</span>
          </div>
        )}

        {locationStatus === 'idle' && !manualAddress && (
          <div className="mb-6 p-4 bg-blue-100 rounded-lg">
            <p className="mb-3">To automatically fill your address, we need your location permission.</p>
            <button
              onClick={enableLocation}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Detect My Location
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Age *</label>
              <input
                type="number"
                name="age"
                min="18"
                max="65"
                value={formData.age}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="18-65 years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg) *</label>
              <input
                type="number"
                name="weight"
                min="45"
                value={formData.weight}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="Minimum 45 kg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Group *</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="">Select Your Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="10-digit mobile number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp Number *</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="10-digit WhatsApp number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address *</label>
            {manualAddress || locationStatus !== 'success' ? (
              <>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  placeholder="Enter your full address for emergency contact"
                />
                {locationStatus !== 'success' && (
                  <button
                    type="button"
                    onClick={enableLocation}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Try detecting location again
                  </button>
                )}
              </>
            ) : (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                readOnly
              />
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-4 rounded-lg text-white font-bold bg-red-600 hover:bg-red-700 transform hover:scale-105 transition duration-300 text-lg"
            >
              🩸 Register as Blood Donor
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default BecomeDonor;