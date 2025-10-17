import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/instance.js";
import GoHomeButton from "../Components/Buttons/GoHomeButton.jsx";

export default function CurrentOwnerProfile() {
  const { userId } = useParams();
  const [owner, setOwner] = useState({});
  // const { notesId } = useParams(); // Get note ID from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [msg, setMsg] = useState(""); // Error message
  // get current owner
  console.log("id: ......", userId)
  useEffect(() => {
    const currentOwner = async () => {
    try {
      if (!token) {
        console.log("No token for Owner AllNotes");
        return;
      }
      const res = await api.get(`/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOwner(res.data.user);
      console.log("ownerasd: ", res.data.user)
      // Don't set success messages
    } catch (e) {
      console.log("current AllNotes: ", e.response.data);
      setMsg(e.response?.data?.message || "Error loading profile");
    }
  };
    currentOwner();
  }, [token]);
  return (
    <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5 mt-4">
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)'}}>
            <span className="text-white" style={{fontSize: '2rem'}}>👤</span>
          </div>
          <h1 className="text-white fw-bold mb-2">My Profile</h1>
          <p className="text-white opacity-75">Manage your account information</p>
        </div>

        {/* Error Message */}
        {msg && (
          <div className="row justify-content-center mb-4">
            <div className="col-md-8 col-lg-6">
              <div className="alert alert-danger border-0 rounded-3 shadow-sm" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {msg}
              </div>
            </div>
          </div>
        )}

        {/* Profile Card */}
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            {owner && (
              <div className="card border-0 rounded-4 shadow-lg" style={{backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.95)'}}>
                <div className="card-body p-5">
                  {/* Profile Avatar */}
                  <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{width: '100px', height: '100px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                      <span className="text-white fw-bold" style={{fontSize: '2.5rem'}}>{owner?.username?.charAt(0)?.toUpperCase()}</span>
                    </div>
                    <h3 className="fw-bold mb-1" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{owner?.username}</h3>
                    <p className="text-muted">Member since {new Date().getFullYear()}</p>
                  </div>

                  {/* Profile Information */}
                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <div className="p-3 rounded-3" style={{background: '#f8f9fa'}}>
                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2">🆔</span>
                          <small className="text-muted fw-medium">User ID</small>
                        </div>
                        <p className="mb-0 fw-medium text-dark" style={{fontSize: '0.9rem', fontFamily: 'monospace'}}>{owner?._id}</p>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <div className="p-3 rounded-3" style={{background: '#f8f9fa'}}>
                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2">👤</span>
                          <small className="text-muted fw-medium">Username</small>
                        </div>
                        <p className="mb-0 fw-bold text-primary">{owner?.username}</p>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <div className="p-3 rounded-3" style={{background: '#f8f9fa'}}>
                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2">🏢</span>
                          <small className="text-muted fw-medium">Organization</small>
                        </div>
                        <p className="mb-0 fw-bold text-success">{owner?.tenant?.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-lg rounded-3 fw-medium text-white border-0 shadow-sm"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        transition: 'all 0.3s ease',
                        transform: 'scale(1)'
                      }}
                      onClick={() => navigate(`/users/${owner?._id}/edit`)}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      ✏️ Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-4">
          <GoHomeButton navigate={navigate}/>
        </div>
      </div>
    </div>
  );
}
