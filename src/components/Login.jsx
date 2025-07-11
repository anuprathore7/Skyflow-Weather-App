
// export default Login;

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const logoRef = useRef();
  const formRef = useRef();

  // Check if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(logoRef.current, {
      duration: 0.7,
      y: -20,
      opacity: 0,
      ease: 'power2.out',
    });

    tl.from(formRef.current.children, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    });
  });

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/dashboard"); // Explicitly navigate to dashboard
    } catch (error) {
      setError("Failed to sign in: " + error.message);
      setLoading(false); // Only set loading to false on error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col justify-center items-center px-4">
      <div className="flex items-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span ref={logoRef} className="font-bold text-3xl text-blue-400">SkyFlow</span>
      </div>
      
      <div className="bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-700 w-full max-w-md">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
          
          {error && (
            <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 text-lg" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition duration-300"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 text-lg" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition duration-300"
                required
              />
            </div>
            
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-bold text-lg transition duration-300 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;