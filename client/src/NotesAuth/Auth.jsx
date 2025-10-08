import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../init/api";

export default function Auth({ setIsLoggedIn }) {
  const [isPage, setIsPage] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    tenant: "",
    role: "",
  });

  const url = isPage ? "login" : "signup";

  const handleChange = (e) => {
    setUserForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmitAuth = async (e) => {
    e.preventDefault();
    if (!isPage) {
      try {
        const res = await api.post(`/api/notes/auth/${url}`, userForm);
        console.log("Sign up done: ", res.data.data);
      } catch (e) {
        if ([401, 402, 403].includes(e.response.status))
          setMsg(e.response.data);
        console.log(e);
      }
    } else {
      try {
        const res = await api.post(`/api/notes/auth/${url}`, userForm);
        const token = res.data;
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const role = decoded.role;
        localStorage.setItem("tokens", token);
        localStorage.setItem("tenant", userForm.tenant);
        localStorage.setItem("role", role);
        setIsLoggedIn(true);
        console.log("role got", role)
        if (role === "admin") navigate("/admin/dashboard");
        else navigate("/notes");
      } catch (e) {
        if ([401, 402, 403].includes(e.status)) setMsg(e.response.data);
      }
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "600px" }}>
        {/* Toggle Buttons */}
        <div className="d-flex mb-3">
          <button
            style={{ width: "2rem" }}
            className={`btn ${
              isPage ? "btn-outline-primary flex-fill" : "btn-primary flex-fill"
            } me-2`}
            onClick={() => setIsPage(false)}
          >
            Sign Up
          </button>
          <button
            className={`btn ${
              isPage ? "btn-primary flex-fill" : "btn-outline-primary flex-fill"
            }`}
            onClick={() => setIsPage(true)}
            style={{width:"2rem"}}
          >
            Login
          </button>
        </div>

        {/* Message */}
        {msg && <div className="alert alert-danger">{msg}</div>}

        {/* Form */}
        <form
          onSubmit={handleSubmitAuth}
          className="p-3 row flex-column align-items-center"
          style={{ height: "20rem" }}
        >
          {/* <div className="g-3 mb-3"> */}
          <div className="col-12">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Email"
              name="email"
              value={userForm.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              name="password"
              value={userForm.password}
              onChange={handleChange}
            />
          </div>
          {/* </div> */}
          {/* <div className="g-3 mb-3"> */}
          <div className="col-12">
            <select
              name="tenant"
              value={userForm.tenant}
              onChange={handleChange}
              className="form-select mb-2"
            >
              <option value="" disabled>
                Select tenant
              </option>
              <option value="Acme">Acme</option>
              <option value="Globex">Globex</option>
            </select>
          </div>

          {!isPage && (
            <>
              <div className="col-12">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Username"
                  name="username"
                  value={userForm.username}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <select
                  name="role"
                  value={userForm.role}
                  onChange={handleChange}
                  className="form-select mb-2"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}
          {/* </div> */}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "6rem" }}
          >
            {isPage ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
