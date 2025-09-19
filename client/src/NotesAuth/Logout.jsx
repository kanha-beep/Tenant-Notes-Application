import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Logout({ setIsLoggedIn, url }) {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("tenant");
    setIsLoggedIn(false);
    console.log("logout url", url)
    return navigate(`/${url}`);
  }, [navigate]);
  return null;
}
