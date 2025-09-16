import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Logout({ setIsLoggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("tenant");
    setIsLoggedIn(false);
    return navigate("/login");
  }, [navigate]);
  return null;
}
