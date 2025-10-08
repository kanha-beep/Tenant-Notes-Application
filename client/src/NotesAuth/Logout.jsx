import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Logout({ setIsLoggedIn, setIsPage }) {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("tenant");
    localStorage.removeItem("role")
    setIsLoggedIn(false);
    setIsPage(false);
    console.log("Offline if no token Logout.jsx");
    console.log("logout url");
    navigate(`/auth`);
  }, [navigate]);
  return null;
}
