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
        navigate("/auth")
      } catch (e) {
        if ([401, 402, 403].includes(e.response.status))
          setMsg(e.response.data);
        console.log(e.response.data);
        alert(e?.response?.data?.message)
      }
    } else {
      try {
        console.log("url login: ", url);
        console.log("form: ", userForm);
        const res = await api.post(`/auth/${url}`, userForm);
        const token = res.data.token;
        console.log("token", token)
        const role = res.data.role;
        localStorage.setItem("tokens", token);
        localStorage.setItem("tenant", userForm.tenant);
        localStorage.setItem("role", role);
        localStorage.setItem("userId: ", res?.data?._id)
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
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3 lg:w-2/5">
            <div className="bg-white/95 backdrop-blur-lg shadow-lg border-0 rounded-2xl" style={{backdropFilter: 'blur(10px)'}}>
              <div className="p-8">
                {/* Logo/Brand */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center rounded-lg mb-3 w-15 h-15" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                    <span className="text-white font-bold text-3xl">T</span>
                  </div>
                  <h2 className="font-bold text-2xl bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">TenantApp</h2>
                  <p className="text-gray-500">Welcome back! Please sign in to your account</p>
                </div>

                {/* Toggle Buttons */}
                <div className="flex mb-6 p-1 rounded-lg bg-gray-100">
                  <button
                    className={`flex-1 rounded-lg font-medium transition-all duration-300 py-2 ${
                      !isPage ? "text-white shadow-sm bg-gradient-to-r from-indigo-500 to-purple-600" : "text-gray-800 bg-transparent"
                    }`}
                    style={{border: 'none'}}
                    onClick={() => setIsPage(false)}
                  >
                    Sign Up
                  </button>
                  <button
                    className={`flex-1 rounded-lg font-medium transition-all duration-300 py-2 ${
                      isPage ? "text-white shadow-sm bg-gradient-to-r from-indigo-500 to-purple-600" : "text-gray-800 bg-transparent"
                    }`}
                    style={{border: 'none'}}
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
