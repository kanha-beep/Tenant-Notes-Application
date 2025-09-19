// import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    // const [msg, setMsg] = useState("")
    // const navigate = useNavigate();
    const token = localStorage.getItem("tokens")
    if(!token) {
        return <Navigate to="/auth" replace/>
    }
  return <Outlet/>;
}
