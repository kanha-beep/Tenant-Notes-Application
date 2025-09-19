import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../init/api"

export default function Signup() {
  const [msg] = useState(location.state?.message || "");
  const [alert] = useState(location.state?.alert || "danger");
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    tenant: "",
    role: ""
  });
  const handleChange = (e) => {
    setUserForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      console.log("data ready", userForm);
      const res = await api.post(
        "/api/notes/auth/signup",
        userForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("sign up done F: ", res.data.data);
      navigate("/login");
    } catch (e) {
      console.log("error SIGNUP F", e.response.data);
      if (e.response.status === 402) return navigate("/login");
    }
  };
  return (
    <div>
      <div> Signup </div>
      <div>
        {alert !== "" ||
          (msg !== "" && (
            <div className={`alert alert-${alert}`} role={alert}>
              {msg}
            </div>
          ))}
      </div>
      <div>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            onChange={handleChange}
            className="p-1 m-2"
            placeholder="Email"
            name="email"
            value={userForm.email}
          />
          <br />
          <input
            type="text"
            onChange={handleChange}
            className="p-1 m-2"
            placeholder="Username"
            name="username"
            value={userForm.username}
          />
          <br />
          <input
            type="password"
            onChange={handleChange}
            className="p-1 m-2"
            placeholder="Password"
            name="password"
            value={userForm.password}
          />
          <br />
          <select
            name="tenant"
            value={userForm.tenant}
            onChange={handleChange}
            className="p-2 m-2"
          >
            <option value="" disabled>
              Select tenant
            </option>
            <option value="Acme">Acme</option>
            <option value="Globex">Globex</option>
          </select>
          <br />
          <select
            name="role"
            value={userForm.role}
            onChange={handleChange}
            className="p-2 m-2"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <br />
          <button>Sign up </button>
        </form>
      </div>
    </div>
  );
}
