# 🩸 BloodBuddy – Smart Blood Donor Finder  

### 🌍 Live Website: **https://www.bloodbuddy.xyz/**  

BloodBuddy is a powerful **location-based blood donor finder** that helps users instantly search for nearby donors using **GPS**, **maps**, and **blood group filters**.

---

## 📚 Table of Contents  
- [🚀 Features](#-features)  
- [🌍 Live Demo](#-live-demo)  
- [📸 Screenshots](#-screenshots)  
- [📁 Project Structure](#-project-structure)  
- [⚙️ Backend Setup](#️-backend-setup-fastapi)  
- [🎨 Frontend Setup](#-frontend-setup-react--leaflet)  
- [🗺 Map & Routing](#-map--route-drawing)  
- [🌐 Deployment Guide](#-deployment-guide)  
- [🧪 API Endpoints](#-api-endpoints)  
- [🛠 Technologies Used](#-technologies-used)  
- [📌 Future Improvements](#-future-improvements)  
- [🤝 Contributing](#-contributing)

---

## 🚀 Features  

- 🔍 Auto-location & manual city search  
- 🩸 Blood group filtering  
- 📍 Real-time nearest donor detection  
- 🗺 Interactive Leaflet map with donor markers  
- ➡️ Route navigation from user → donor  
- 📝 Donor registration with coordinates  
- ☁️ MongoDB Atlas for cloud data  
- 🌐 Deployed on Azure (Frontend) + Render (Backend)  

---

## 🌍 Live Demo  
### 🔗 **https://www.bloodbuddy.xyz/**  

---

## 📸 Screenshots  


| Home Page | Map View | Donor List |
|-----------|----------|------------|
| <img width="500" alt="Home Page" src="https://github.com/user-attachments/assets/e0bfd9f3-f8f6-4f4f-bc79-f0f6f813e42e" /> | <img width="500" alt="Map View" src="https://github.com/user-attachments/assets/f889a4dc-b04b-464f-bead-a5173d968eda" /> | <img width="500" alt="Donor List" src="https://github.com/user-attachments/assets/f3fdcc93-3dac-4af7-aad6-d467258b0fb6" /> |



---

## 📁 Project Structure

```bash
BloodBuddy/
│
├── Backend/
│   ├── main.py
│   ├── routes/
│   │   └── donor_routes.py
│   ├── models/
│   │   └── donor_model.py
│   ├── utils/
│   │   └── geo_utils.py
│   ├── database/
│   │   └── connection.py
│   ├── requirements.txt
│   └── .env
│
└── FrontEnd/
    ├── src/
    │   ├── MapView.jsx
    │   ├── DonorFilterSection.jsx
    │   ├── components/...
    │   └── App.js
    ├── public/
    ├── package.json
    └── .env
```

---

## ⚙️ Backend Setup (FastAPI)

### 1️⃣ Install dependencies  
```bash
cd Backend
pip install -r requirements.txt
```

### 2️⃣ Add `.env`  
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
```

### 3️⃣ Run server  
```bash
uvicorn main:app --reload
```

- API Base URL: `http://127.0.0.1:8000`  
- Docs: `http://127.0.0.1:8000/docs`  

---

## 🎨 Frontend Setup (React + Leaflet)

### 1️⃣ Install dependencies  
```bash
cd FrontEnd
npm install
```

### 2️⃣ Add `.env`  
```env
REACT_APP_API_URL=https://blood-buddy-backend.onrender.com
```

### 3️⃣ Run locally  
```bash
npm start
```

- App URL: `http://localhost:3000`  

---

## 🗺 Map & Route Drawing

Using:

- `leaflet`  
- `leaflet-routing-machine`  
- `react-leaflet`  

Install:

```bash
npm install leaflet leaflet-routing-machine react-leaflet
```

Features:

- Donor markers  
- Click donor → auto route drawn  
- Map centers based on user or selected donor  

---

## 🌐 Deployment Guide

### 🌍 Frontend → Azure Static Web App  

- Push code to GitHub  
- Go to **Azure Portal → Static Web Apps → Create**  
- Build settings:
  - App location: `FrontEnd`  
  - Output location: `build`  

Azure will set up **GitHub Actions** and auto-deploy on every push.

---

### ⚙️ Backend → Render  

- Create a **Web Service** on Render  
- Connect your GitHub repo and select `Backend` folder  
- Set Start Command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

- Add Environment Variable:

```env
MONGO_URI=your_atlas_uri
```

Render will build and deploy automatically.

---

## 🧪 API Endpoints

### ➕ Add Donor  
**Endpoint:**  
```http
POST /donors/add
```

**Sample Body:**
```json
{
  "name": "Amit",
  "blood_group": "A+",
  "city": "Nagpur",
  "contact": "9999999999",
  "latitude": 21.1458,
  "longitude": 79.0882
}
```

---

### 🔍 Get Nearby Donors  

**Endpoint:**  
```http
GET /donors/nearby?lat=21.14&lon=79.08&limit=10&blood_group=A+
```

**Sample Response:**
```json
{
  "count": 2,
  "donors": [
    {
      "name": "Test Donor",
      "blood_group": "A+",
      "city": "Nagpur",
      "contact": "9999999999",
      "distance_km": 1.2,
      "latitude": 21.1450,
      "longitude": 79.0890
    }
  ]
}
```

---

## 🛠 Technologies Used  

### 🖥 Frontend  
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)  
![Leaflet](https://img.shields.io/badge/Leaflet-Maps-brightgreen?style=flat-square&logo=leaflet)  
![Azure](https://img.shields.io/badge/Hosted_on-Azure_Static_Web_App-0078D4?style=flat-square&logo=microsoft-azure)

- React  
- React Hooks  
- Leaflet & Leaflet Routing Machine  
- Axios  
- Azure Static Web Apps  

### ⚙️ Backend  
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi)  
![Python](https://img.shields.io/badge/Python-3.x-yellow?style=flat-square&logo=python)  
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)  
![Render](https://img.shields.io/badge/Deployed_on-Render-purple?style=flat-square&logo=render)

- FastAPI  
- Pydantic  
- Uvicorn  
- MongoDB Atlas  
- Geopy  
- Render  

---

## 📌 Future Improvements  

- 🔐 OTP verification for donor registration  
- 🟢 Donor availability & active status toggle  
- 🧑‍💻 Admin dashboard for verification & management  
- 🚨 Emergency SOS broadcast for urgent blood requirements  
- 🧬 Blood bank API integration for real-time availability  

---

## 🤝 Contributing  

Contributions are welcome!  

1. Fork the repository  
2. Create your feature branch:  
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Add amazing feature"
   ```
4. Push to the branch:  
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request  

If you like this project, please ⭐ **star the repository** and share it with others.  

---
## 👨‍💻 Author  

**Amit Kumar Yadav**

🔗 **GitHub:** [github.com/amityadav-72](https://github.com/amityadav-72)  
🔗 **LinkedIn:** [linkedin.com/in/amityadav72](https://www.linkedin.com/in/amityadav72)
