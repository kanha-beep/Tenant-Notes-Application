import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../init/instance.js";

export default function MyNavbar({ isLoggedIn, setMsg , userRole}) {
  const [owner, setOwner] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentOwner = async () => {
    try {
      const res = await api.get("/auth/me");
      setOwner(res.data);
    } catch (e) {
      if ([401, 402, 403].includes(e.response.status)) setMsg(e.response.data);
      console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) currentOwner();
    // console.log("isLoggedIn value navbar: ", isLoggedIn);
  }, [isLoggedIn]);
  return (
    <nav className="modern-navbar sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="gradient-text font-bold text-xl">TenantApp</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn && (
              <>
                {userRole === "admin" && (
                  <Link 
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                    to="/admin/dashboard"
                  >
                    📊 Dashboard
                  </Link>
                )}
                {userRole === "user" && (
                  <Link 
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                    to="/notes"
                  >
                    📊 Dashboard
                  </Link>
                )}
                <Link 
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                  to={`/users/${owner?._id}`}
                >
                  👤 Profile
                </Link>
                <Link 
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                  to="/logout"
                >
                  🚪 Logout
                </Link>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link 
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                  to="/auth"
                >
                  📝 Sign Up
                </Link>
                <Link 
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                  to="/auth"
                >
                  🔐 Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="py-4 space-y-2">
            {isLoggedIn && (
              <>
                {userRole === "admin" && (
                  <Link 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    to="/admin/dashboard"
                  >
                    📊 Dashboard
                  </Link>
                )}
                {userRole === "user" && (
                  <Link 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    to="/notes"
                  >
                    📊 Dashboard
                  </Link>
                )}
                <Link 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  to={`/users/${owner?._id}`}
                >
                  👤 Profile
                </Link>
                <Link 
                  className="block px-4 py-2 bg-red-500 text-white rounded-lg transition-all duration-200 text-center"
                  to="/logout"
                >
                  🚪 Logout
                </Link>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link 
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  to="/auth"
                >
                  📝 Sign Up
                </Link>
                <Link 
                  className="block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg transition-all duration-200 text-center"
                  to="/auth"
                >
                  🔐 Login
                </Link>
              </>
            )}
          </div>
        </div>
        )}
      </div>
    </nav>
  );
}
