// src/components/AuthNavbar.js
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AuthNavbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const skyRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(skyRef.current, {
      duration: 0.7,
      y: -20,
      opacity: 0,
      delay: 0.5,
      ease: 'power2.out',
    });

    tl.from("h2", {
      y: -20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.4,
      ease: "power2.out"
    });
  });

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  return (
    <nav className="bg-gray-900 text-white shadow-lg border-b border-gray-800">
      <div className="w-full px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span ref={skyRef} className="font-bold text-2xl text-blue-400">SkyFlow</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="font-bold text-gray-300 hover:text-blue-400 transition duration-300">
              <h2>Home</h2>
            </a>
            <a href="#" className="font-bold text-gray-300 hover:text-blue-400 transition duration-300">
              <h2>Map</h2>
            </a>
            <a href="#" className="font-bold text-gray-300 hover:text-blue-400 transition duration-300">
              <h2>Forecast</h2>
            </a>
            <a href="#" className="font-bold text-gray-300 hover:text-blue-400 transition duration-300">
              <h2>About</h2>
            </a>
          </div>
          <div className="flex items-center">
            <div className="text-gray-300 mr-4 hidden md:block">
              {currentUser && <span>{currentUser.email}</span>}
            </div>
            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;