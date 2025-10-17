import React, { useEffect, useState } from "react";
import api from "../../init/instance.js";
import Left from "./Left";
import Right from "./Right";

export default function Dashboard({ isLoggedIn }) {
  const [details, setDetails] = useState(null);
  const token = localStorage.getItem("tokens");

  const getAllDetails = async () => {
    try {
      const res = await api.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("all details Dashboard:", res.data);
      setDetails(res.data);
    } catch (e) {
      console.log("error", e.response.data);
    }
  };

  useEffect(() => {
    getAllDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="container-fluid py-4">
        <div className="row g-4">
          {/* Left sidebar */}
          <div className="col-12 col-lg-3">
            <Left />
          </div>
          {/* Main dashboard content */}
          <div className="col-12 col-lg-9">
            <Right details={details} />
          </div>
        </div>
      </div>
    </div>
  );
}
