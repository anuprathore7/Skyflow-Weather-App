// import React, { useState, useEffect, useRef } from "react";
// import "./App.css";
// import { FaSearch, FaTemperatureHigh } from "react-icons/fa";
// import { WiHumidity, WiStrongWind } from "react-icons/wi";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend,
// } from "chart.js";


// // Register ChartJS components
// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend
// );

// // Fix default marker icons for Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// // Dark mode custom navbar
// const DarkNavbar = () => {
   
//   const SkyRef = useRef();

//   useGSAP(()=>{
//     const tl = gsap.timeline();

//     tl.from(SkyRef.current, {
//       duration: 0.7,
//       y: -20,
//       opacity: 0,
//       delay: 0.5,
//       ease: 'power2.out',
//     });

//     tl.from("h2",{
//       y: -20,
//       opacity: 0,
//       stagger: 0.2, // Controls the delay between each element
//       duration: 0.4,
//       ease: "power2.out"
//     })

    

//   })

//   return (
//     <nav className="bg-gray-900 text-white shadow-lg border-b border-gray-800">
//       <div className="w-full px-6 py-4">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//             </svg>
//             <span ref={SkyRef} className="font-bold text-2xl text-blue-400">SkyFlow</span>
//           </div>
//           <div className=" part-2 hidden md:flex space-x-8">
//             <a href="#" className=" font-bold text-gray-300 hover:text-blue-400 transition duration-300"><h2>Home</h2></a>
//             <a href="#" className=" font-bold text-gray-300 hover:text-blue-400 transition duration-300"> <h2>Map</h2></a>
//             <a href="#" className=" font-bold text-gray-300 hover:text-blue-400 transition duration-300"><h2>Forecast</h2></a>
//             <a href="#" className=" font-bold text-gray-300 hover:text-blue-400 transition duration-300"><h2>About</h2></a>
//           </div>
//           <div className="md:hidden">
//             <button className="focus:outline-none">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// // Map updater component
// const MapUpdater = ({ coordinates }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (coordinates) {
//       map.setView([coordinates.lat, coordinates.lon], 10);
//     } else {
//       map.setView([20.5937, 78.9629], 4); // Default to India
//     }
//   }, [coordinates, map]);

//   return null;
// };

// const App = () => {
//   // State variables
//   const [forecastData, setForecastData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [temperature, setTemperature] = useState(null);
//   const [humidity, setHumidity] = useState(null);
//   const [windSpeed, setWindSpeed] = useState(null);
//   const [city, setCity] = useState("");
//   const [weatherIcon, setWeatherIcon] = useState("01d");
//   const [coordinates, setCoordinates] = useState(null);
//   const [weatherDescription, setWeatherDescription] = useState("");

//   const API_KEY = "2bddf54b275bd3d4bf4c4c37f7a185f9";

//   const fetchWeather = async () => {
//     if (search.trim() === "") return;
//     setLoading(true);

//     try {
//       const weatherRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`
//       );

//       const forecastRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=${API_KEY}`
//       );

//       const weather = weatherRes.data;
//       const forecast = forecastRes.data;

//       if (weather.cod === 200) {
//         setTemperature(weather.main.temp);
//         setHumidity(weather.main.humidity);
//         setWindSpeed(weather.wind.speed);
//         setCity(weather.name);
//         setWeatherIcon(weather.weather[0].icon);
//         setWeatherDescription(weather.weather[0].description);
//         setCoordinates({
//           lat: weather.coord.lat,
//           lon: weather.coord.lon,
//         });

//         // Get 5-day daily forecast by filtering data points
//         const filteredForecast = forecast.list.filter(
//           (_, index) => index % 8 === 0
//         );
//         setForecastData(filteredForecast);
//       }
//     } catch (error) {
//       console.error(error);
//       // Reset all states on error
//       setTemperature(null);
//       setHumidity(null);
//       setWindSpeed(null);
//       setCity("");
//       setWeatherIcon("01d");
//       setWeatherDescription("");
//       setCoordinates(null);
//       setForecastData([]);
//       alert("City not found. Please try again.");
//     }

//     setLoading(false);
//   };

//   // Handle Enter key press in search input
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       fetchWeather();
//     }
//   };

//   // Get weather icon class based on weather code
//   const getWeatherBackground = () => {
//     if (!weatherIcon) return "bg-gray-800";
    
//     if (weatherIcon.includes("01")) return "bg-gradient-to-br from-gray-800 to-blue-900"; // clear sky
//     if (weatherIcon.includes("02")) return "bg-gradient-to-br from-gray-900 to-blue-800"; // few clouds
//     if (weatherIcon.includes("03") || weatherIcon.includes("04")) return "bg-gradient-to-br from-gray-800 to-gray-900"; // clouds
//     if (weatherIcon.includes("09") || weatherIcon.includes("10")) return "bg-gradient-to-br from-gray-900 to-indigo-900"; // rain
//     if (weatherIcon.includes("11")) return "bg-gradient-to-br from-gray-900 to-purple-900"; // thunderstorm
//     if (weatherIcon.includes("13")) return "bg-gradient-to-br from-gray-800 to-blue-900"; // snow
//     if (weatherIcon.includes("50")) return "bg-gradient-to-br from-gray-800 to-gray-900"; // mist
    
//     return "bg-gradient-to-br from-gray-800 to-blue-900";
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Dark mode navbar */}
//       <DarkNavbar />
      
//       {/* Main Content Container - Full Width */}
//       <div className="w-full px-4 py-6">
//         {/* Search Bar - Full Width */}
//         <div className="max-w-2xl mx-auto mb-8">
//           <div className="flex items-center bg-gray-800 rounded-full overflow-hidden shadow-lg border border-gray-700 focus-within:border-blue-500 transition-all duration-300">
//             <input
//               className="flex-grow px-6 py-3 outline-none bg-transparent text-white text-lg placeholder-gray-400"
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Search city..."
//             />
//             <button
//               onClick={fetchWeather}
//             className="bg-blue-600 hover:bg-blue-700 text-white p-3 px-6 transition-colors rounded-full mr-1 duration-300 focus:outline-none"
//             >
//               <FaSearch className="text-lg" />
//             </button>
//           </div>
//         </div>

//         {/* Content Area - Full Width Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
//           {/* Weather Information Card - LEFT SIDE */}
//           <div className={`rounded-3xl shadow-xl overflow-hidden ${getWeatherBackground()} text-white border border-gray-700 h-full`}>
//             {loading ? (
//               <div className="flex justify-center items-center h-full min-h-96">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
//               </div>
//             ) : (
//               <div className="p-8 h-full">
//                 {temperature !== null ? (
//                   <div className="h-full flex flex-col">
//                     <div className="text-center mb-8">
//                       <h2 className="text-4xl font-bold">{city}</h2>
//                       <p className="text-xl mt-2 capitalize">{weatherDescription}</p>
//                     </div>
                    
//                     <div className="flex justify-center items-center mb-8">
//                       <img
//                         src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
//                         alt="Weather icon"
//                         className="h-40 w-40 drop-shadow-lg"
//                       />
//                       <div className="ml-4">
//                         <h1 className="text-7xl font-bold">{Math.round(temperature)}°C</h1>
//                       </div>
//                     </div>
                    
//                     {/* Weather Details */}
//                     <div className="grid grid-cols-2 gap-6 mt-6">
//                       <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-6 flex items-center">
//                         <WiHumidity className="text-5xl mr-4 text-blue-400" />
//                         <div>
//                           <p className="text-lg font-light text-gray-300">Humidity</p>
//                           <h3 className="text-3xl font-bold">{humidity}%</h3>
//                         </div>
//                       </div>
                      
//                       <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-6 flex items-center">
//                         <WiStrongWind className="text-5xl mr-4 text-blue-400" />
//                         <div>
//                           <p className="text-lg font-light text-gray-300">Wind Speed</p>
//                           <h3 className="text-3xl font-bold">{windSpeed} km/h</h3>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* 5-Day Forecast */}
//                     {forecastData.length > 0 && (
//                       <div className="mt-8">
//                         <h3 className="text-2xl font-bold mb-6">5-Day Forecast</h3>
//                         <div className="grid grid-cols-5 gap-4">
//                           {forecastData.map((item, index) => (
//                             <div key={index} className="bg-gray-800 bg-opacity-50 rounded-xl p-4 text-center">
//                               <p className="font-medium">
//                                 {new Date(item.dt_txt).toLocaleDateString("en-US", {
//                                   weekday: "short",
//                                 })}
//                               </p>
//                               <img
//                                 src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
//                                 alt="Weather icon"
//                                 className="h-12 w-12 mx-auto my-2"
//                               />
//                               <p className="text-2xl font-bold">{Math.round(item.main.temp)}°</p>
//                               <p className="text-sm capitalize text-gray-300">{item.weather[0].description}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Temperature Graph */}
//                     {forecastData.length > 0 && (
//                       <div className="mt-8 bg-gray-800 bg-opacity-50 rounded-2xl p-6 flex-grow">
//                         <h3 className="text-2xl font-bold mb-4">Temperature Trend</h3>
//                         <div className="h-64">
//                           <Line
//                             data={{
//                               labels: forecastData.map((item) =>
//                                 new Date(item.dt_txt).toLocaleDateString("en-US", {
//                                   weekday: "short",
//                                 })
//                               ),
//                               datasets: [
//                                 {
//                                   label: "Temperature (°C)",
//                                   data: forecastData.map((item) => item.main.temp),
//                                   backgroundColor: "rgba(59, 130, 246, 0.2)",
//                                   borderColor: "rgba(59, 130, 246, 0.8)",
//                                   borderWidth: 3,
//                                   pointRadius: 6,
//                                   pointBackgroundColor: "#3b82f6",
//                                   fill: true,
//                                   tension: 0.4,
//                                 },
//                               ],
//                             }}
//                             options={{
//                               responsive: true,
//                               maintainAspectRatio: false,
//                               plugins: {
//                                 legend: {
//                                   display: true,
//                                   position: "top",
//                                   labels: {
//                                     color: "#fff",
//                                     font: {
//                                       size: 14,
//                                       weight: "bold",
//                                     },
//                                   },
//                                 },
//                                 tooltip: {
//                                   backgroundColor: "rgba(17, 24, 39, 0.9)",
//                                   titleColor: "#fff",
//                                   bodyColor: "#fff",
//                                   bodyFont: {
//                                     size: 14,
//                                   },
//                                   padding: 12,
//                                   borderColor: "rgba(59, 130, 246, 0.5)",
//                                   borderWidth: 1,
//                                   displayColors: false,
//                                 },
//                               },
//                               scales: {
//                                 y: {
//                                   beginAtZero: false,
//                                   grid: {
//                                     color: "rgba(255, 255, 255, 0.1)",
//                                   },
//                                   ticks: {
//                                     color: "#9ca3af",
//                                     font: {
//                                       size: 12,
//                                     },
//                                   },
//                                 },
//                                 x: {
//                                   grid: {
//                                     display: false,
//                                   },
//                                   ticks: {
//                                     color: "#9ca3af",
//                                     font: {
//                                       size: 12,
//                                     },
//                                   },
//                                 },
//                               },
//                             }}
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center h-full min-h-96">
//                     <img
//                       src={`https://openweathermap.org/img/wn/02d@4x.png`}
//                       alt="Weather icon"
//                       className="h-32 w-32 opacity-70"
//                     />
//                     <h2 className="text-3xl font-bold mt-6 text-center">
//                       Enter a city to get weather information
//                     </h2>
//                     <p className="mt-4 text-lg text-center max-w-md text-gray-300">
//                       Search for any city around the world to see real-time weather data and forecast.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Map Section - RIGHT SIDE */}
//           <div className="bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-700 h-full">
//             <div className="p-8 h-full flex flex-col">
//               <h2 className="text-3xl font-bold text-white mb-6">
//                 {city ? `${city} on Map` : "Location Map"}
//               </h2>
//               <div className="flex-grow h-[600px] rounded-2xl overflow-hidden border border-gray-700 shadow-inner">
//                 <MapContainer
//                   center={coordinates ? [coordinates.lat, coordinates.lon] : [20.5937, 78.9629]}
//                   zoom={coordinates ? 10 : 4}
//                   scrollWheelZoom={true}
//                   style={{ height: "100%", width: "100%" }}
//                   className="z-0"
//                 >
//                   <TileLayer
//                     attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   />
//                   <MapUpdater coordinates={coordinates} />
//                   {coordinates && (
//                     <Marker position={[coordinates.lat, coordinates.lon]}>
//                       <Popup>
//                         <div className="text-center p-2">
//                           <h3 className="font-bold text-lg">{city}</h3>
//                           <div className="flex items-center justify-center mt-2">
//                             <img
//                               src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
//                               alt="Weather icon"
//                               className="h-10 w-10"
//                             />
//                             <span className="text-xl font-bold">{Math.round(temperature)}°C</span>
//                           </div>
//                           <p className="mt-1 capitalize">{weatherDescription}</p>
//                         </div>
//                       </Popup>
//                     </Marker>
//                   )}
//                 </MapContainer>
//               </div>
              
//               {/* Map Info Section */}
//               <div className="mt-6">
//                 {coordinates ? (
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-gray-700 rounded-xl p-4">
//                       <p className="text-gray-400">Latitude</p>
//                       <h3 className="text-xl font-semibold text-white">{coordinates.lat.toFixed(4)}°</h3>
//                     </div>
//                     <div className="bg-gray-700 rounded-xl p-4">
//                       <p className="text-gray-400">Longitude</p>
//                       <h3 className="text-xl font-semibold text-white">{coordinates.lon.toFixed(4)}°</h3>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="bg-gray-700 rounded-xl p-6 text-gray-200">
//                     <h3 className="font-bold text-xl mb-2 text-blue-400">How to use the map</h3>
//                     <p>
//                       Search for a city in the search bar above to view its location on the map and get detailed weather information.
//                     </p>
//                     <ul className="list-disc ml-5 mt-2 text-gray-300">
//                       <li>Zoom in/out using the + and - buttons</li>
//                       <li>Click and drag to navigate the map</li>
//                       <li>Click on the marker to see weather details</li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Footer - Full Width */}
//       <footer className="bg-gray-900 text-white mt-12 py-8 border-t border-gray-800">
//         <div className="w-full px-4">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center mb-4 md:mb-0">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//               </svg>
//               <span className=" font-bold text-2xl text-blue-400">SkyFlow</span>
//             </div>
           
//           </div>
//           <div className="mt-8 text-center text-gray-500">
//             <p>© 2025 SkyFlow Weather App. All rights reserved.</p>
            
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default App;
// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;