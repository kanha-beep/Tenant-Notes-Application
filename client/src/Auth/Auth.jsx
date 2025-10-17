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
            style={{ width: "2rem" }}
          >
            Login
          </button>
        </div>

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
