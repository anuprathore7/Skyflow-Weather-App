// src/components/Dashboard.js
import React from "react";
import AuthNavbar from "./AuthNavbar";
import WeatherApp from "./WeatherApp";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AuthNavbar />
      <WeatherApp />
    </div>
  );
};

export default Dashboard;