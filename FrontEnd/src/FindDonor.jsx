import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';  
import Footer from './Footer';

const FindDonor = () => {
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
                'User-Agent': 'BloodDonorApp/1.0' // Required by Nominatim usage policy
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
  setError('');

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/donors/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        age: Number(formData.age),
        weight: Number(formData.weight)
      }),
    });

    const data = await response.json();

    if (!response.ok) {
     
      throw new Error(data.message || 'Registration failed');
    }

    alert('Registration successful!');
    setFormData({
      name: '',
      age: '',
      
      weight: '',
      bloodGroup: '',
      mobile: '',
      whatsapp: '',
      address: ''
    });
    
  } catch (err) {
    console.error('Registration error:', err);
    setError(err.message || 'An error occurred. Please try again.');
  }
};

  const enableLocation = () => {
    fetchLocation();
  };

  return (<>
    <Navbar />  
    <div className="max-w-4xl mx-auto p-6 pt-24">
    
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-lg p-6 mb-8 shadow-sm">
        <h1 className="text-3xl font-bold text-red-700 mb-4 text-center">
          Find Blood Donors in Your Area
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed text-justify">
          Welcome to Blood Buddy's donor matching system - your lifeline in emergency situations. 
          Our platform is designed to quickly connect blood recipients with verified donors in their 
          vicinity using advanced location-based technology. By leveraging our extensive database of 
          thousands of registered donors across the Vidarbha region, we ensure that you can find 
          compatible blood types within your proximity. Simply fill out the form below with your 
          requirements, and our intelligent matching algorithm will instantly search for available 
          donors near your location. We prioritize your privacy while maintaining the highest standards 
          of safety and reliability. In critical moments when every second counts, Blood Buddy serves 
          as your trusted companion to bridge the gap between need and availability, making the process 
          of finding blood donors efficient, secure, and hassle-free.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">Quick Matching</span>
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">Verified Donors</span>
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">Location-Based</span>
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">24/7 Available</span>
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">Secure & Private</span>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          Blood Donor Registration
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
            <label className="block text-sm font-medium text-gray-700">Full Name of Recipient *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Age of Recipient *</label>
              <input
                type="number"
                name="age"
                min="18"
                max="65"
                value={formData.age}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg) of Recipient *</label>
              <input
                type="number"
                name="weight"
                min="80"
                value={formData.weight}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Group Required*</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="">Select Blood Type Required</option>
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
              <label className="block text-sm font-medium text-gray-700">Mobile Number of Recipient*</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp Number of Recipient *</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address of Recipient*</label>
            {manualAddress || locationStatus !== 'success' ? (
              <>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  placeholder="Enter your full address"
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
              className="px-6 py-3 rounded-md text-white font-medium bg-red-600 hover:bg-red-700 transition duration-300 transform hover:scale-105"
            >
              Find Nearby Donor 
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default FindDonor;