import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../init/instance.js";
// import jwt from "jsonwebtoken";


export default function Auth({ setIsLoggedIn, setMsg, msg }) {
  const [isPage, setIsPage] = useState(true);
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    tenant: "",
    role: "",
  });

  const url = isPage ? "login" : "register";

  const handleChange = (e) => {
    setUserForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmitAuth = async (e) => {
    e.preventDefault();
    if (!isPage) {
      try {
        console.log("url signup: ", url);
        const res = await api.post(`/auth/${url}`, userForm);
        console.log("Sign up done: ", res.data.data);
      } catch (e) {
        if ([401, 402, 403].includes(e.response.status))
          setMsg(e.response.data);
        console.log(e.response.data);
      }
    } else {
      try {
        console.log("url login: ", url);
        console.log("form: ", userForm);
        const res = await api.post(`/auth/${url}`, userForm);
        const token = res.data.token;
        console.log("token", token)
        // const decoded = jwt.decode(token);
        // console.loh("decoded: ", decoded)
        const role = res.data.role;
        localStorage.setItem("tokens", token);
        localStorage.setItem("tenant", userForm.tenant);
        localStorage.setItem("role", role);
        console.log("login done")
        setIsLoggedIn(true);
        console.log("role got", role);
        if (role === "admin") navigate("/admin/dashboard");
        else navigate("/notes");
      } catch (e) {
        if ([401, 402, 403].includes(e.response?.status)) setMsg(e.response?.data);
      }
    }
  };
  console.log("error msg in Auth: ", msg);
  
  // Show error message if exists
  if (msg) {
    setTimeout(() => setMsg(""), 5000);
  }
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0 rounded-4" style={{backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.95)'}}>
              <div className="card-body p-5">
                {/* Logo/Brand */}
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                    <span className="text-white fw-bold fs-3">T</span>
                  </div>
                  <h2 className="fw-bold" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>TenantApp</h2>
                  <p className="text-muted">Welcome back! Please sign in to your account</p>
                </div>

                {/* Toggle Buttons */}
                <div className="d-flex mb-4 p-1 rounded-3" style={{background: '#f8f9fa'}}>
                  <button
                    className={`btn flex-fill rounded-3 fw-medium transition-all ${
                      !isPage ? "text-white shadow-sm" : "text-dark bg-transparent"
                    }`}
                    style={{
                      background: !isPage ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                      border: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setIsPage(false)}
                  >
                    Sign Up
                  </button>
                  <button
                    className={`btn flex-fill rounded-3 fw-medium transition-all ${
                      isPage ? "text-white shadow-sm" : "text-dark bg-transparent"
                    }`}
                    style={{
                      background: isPage ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                      border: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setIsPage(true)}
                  >
                    Login
                  </button>
                </div>

                {/* Error Message */}
                {msg && (
                  <div className="alert border-0 rounded-3 shadow-sm mb-4" style={{background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)', color: 'white'}}>
                    <div className="d-flex align-items-center">
                      <span className="me-2">⚠️</span>
                      <span>{msg}</span>
                    </div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmitAuth}>
                  <div className="mb-3">
                    <label className="form-label fw-medium text-dark">📧 Email</label>
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3 border-0 shadow-sm"
                      placeholder="Enter your email"
                      name="email"
                      value={userForm.email}
                      onChange={handleChange}
                      style={{background: '#f8f9fa', transition: 'all 0.3s ease'}}
                      onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'}
                      onBlur={(e) => e.target.style.boxShadow = 'none'}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fw-medium text-dark">🔒 Password</label>
                    <input
                      type="password"
                      className="form-control form-control-lg rounded-3 border-0 shadow-sm"
                      placeholder="Enter your password"
                      name="password"
                      value={userForm.password}
                      onChange={handleChange}
                      style={{background: '#f8f9fa', transition: 'all 0.3s ease'}}
                      onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'}
                      onBlur={(e) => e.target.style.boxShadow = 'none'}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fw-medium text-dark">🏢 Tenant</label>
                    <select
                      name="tenant"
                      value={userForm.tenant}
                      onChange={handleChange}
                      className="form-select form-select-lg rounded-3 border-0 shadow-sm"
                      style={{background: '#f8f9fa', transition: 'all 0.3s ease'}}
                      onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'}
                      onBlur={(e) => e.target.style.boxShadow = 'none'}
                    >
                      <option value="" disabled>Select tenant</option>
                      <option value="Acme">Acme</option>
                      <option value="Globex">Globex</option>
                    </select>
                  </div>

                  {!isPage && (
                    <>
                      <div className="mb-3">
                        <label className="form-label fw-medium text-dark">👤 Username</label>
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-3 border-0 shadow-sm"
                          placeholder="Enter your username"
                          name="username"
                          value={userForm.username}
                          onChange={handleChange}
                          style={{background: '#f8f9fa', transition: 'all 0.3s ease'}}
                          onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'}
                          onBlur={(e) => e.target.style.boxShadow = 'none'}
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label fw-medium text-dark">⚡ Role</label>
                        <select
                          name="role"
                          value={userForm.role}
                          onChange={handleChange}
                          className="form-select form-select-lg rounded-3 border-0 shadow-sm"
                          style={{background: '#f8f9fa', transition: 'all 0.3s ease'}}
                          onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'}
                          onBlur={(e) => e.target.style.boxShadow = 'none'}
                        >
                          <option value="" disabled>Select Role</option>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="btn btn-lg w-100 rounded-3 fw-medium text-white border-0 shadow-sm"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      transition: 'all 0.3s ease',
                      transform: 'scale(1)'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    {isPage ? "🚀 Login" : "✨ Sign Up"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
