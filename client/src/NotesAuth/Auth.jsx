import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
// import * as jwt_decode from "jwt-decode";
import api from "../init/api";

export default function Auth({ setIsLoggedIn }) {
  // const [url, setUrl] = useState("");
  // const [role, setRole] = useState("");
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
    //sign up
    if (isPage === false) {
      try {
        e.preventDefault();
        console.log("data ready", userForm, url);
        const res = await api.post(
          `/api/notes/auth/${url}`,
          userForm
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        console.log("sign up done F: ", res.data.data);
        // setUrl("login");
      } catch (e) {
        //sign up try ended
        if (e.response.status === 401) return setMsg(e.response.data);
        if (e.response.status === 402) return setMsg(e.response.data);
        if (e.response.status === 403) return setMsg(e.response.data);
        console.log(e);
      } // sign up catch ended
    } //if ended
    //login
    else {
      try {
        e.preventDefault();
        console.log("login url", url);
        const res = await api.post(`/api/notes/auth/${url}`, userForm);
        console.log("Login B done now F", url);
        // const role = res.data.role;
        const token = res.data;
        const parseJwt = (token) => {
          try {
            return JSON.parse(atob(token.split(".")[1]));
          } catch (e) {
            console.log("error in ADMIN LOGIN:", e);
            return null;
          }
        };
        // console.log("1. data ready for login", userForm); //
        const decoded = parseJwt(token);
        console.log(decoded);
        const role = decoded.role;
        console.log("decoding done", role); //admin
        localStorage.setItem("tokens", token);
        const tokenRole = decoded.role;
        console.log("new role: ", tokenRole); //admin
        setIsLoggedIn(true);
        localStorage.setItem("tenant", userForm.tenant);
        localStorage.getItem("tenant");
        console.log("role check starts");
        localStorage.setItem("role", role);
        if (role === "admin") {
          console.log("role check: ", role); //admin

          navigate("/admin/dashboard"); // go to admin dashboard
        } else {
          console.log("role check: ", role);
          navigate("/notes"); // go to normal notes page
        }
      } catch (e) {
        //login try ended
        if (e.status === 401) {
          console.log("error while login", e.response.data);
          // setUrl("signup");
        } else if (e.status === 402) {
          console.log("error while login", e.response.data);
          // setUrl("login");
          setMsg(e.response.data);
        } else if (e.status === 403) {
          console.log("error while login", e.response.data);
          // setUrl("login");
          setMsg(e.response.data);
        }
      } //login catch ended
    } //else ended
  };
  return (
    <div
      style={{
        // backgroundColor: "aqua",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="p-2 m-2"
    >
      <div
        style={{
          minHeight: "30rem", // 👈 keeps space even if fields are hidden
          width: "25rem",
          background: "white",
          borderRadius: "1rem",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
          className="m-2"
        >
          <button
            style={{
              fontSize: "2rem",
              border: "5px solid blue",
              borderRadius: "5rem",
            }}
            className={`btn ${isPage ? "btn-outline-primary" : "btn-primary"}`}
            onClick={() => {
              setIsPage(false);
            }}
          >
            Sign Up
          </button>
          <button
            style={{
              // display: "flex",
              // justifyContent: "center",
              fontSize: "2rem",
              border: "5px solid blue",
              borderRadius: "5rem",
            }}
            className={`btn ${
              isPage ? "btn-primary" : "btn-outline-primary"
            } ms-2`}
            onClick={() => {
              setIsPage(true);
            }}
          >
            Login{" "}
          </button>
        </div>
        {msg !== "" && (
          <div className="alert alert-danger" role="alert">
            {msg}
          </div>
        )}
        <div>
          {isPage ? "true" : "false"}
          <form onSubmit={handleSubmitAuth}>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Email"
              name="email"
              value={userForm.email}
              className="p-2 rounded-5 m-2"
            />
            <br />
            <input
              type="text"
              onChange={handleChange}
              placeholder="Password"
              name="password"
              value={userForm.password}
              className="p-2 rounded-5 m-2"
            />{" "}
            <br />
            <select
              name="tenant"
              value={userForm.tenant}
              onChange={handleChange}
              className="p-2 m-2 rounded-5"
            >
              <option value="" disabled>
                Select tenant
              </option>
              <option value="Acme">Acme</option>
              <option value="Globex">Globex</option>
            </select>
            <br />
            {!isPage && (
              <>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Username"
                  name="username"
                  value={userForm.username}
                  className="p-2 rounded-5 m-2"
                />
                <br />
                <select
                  name="role"
                  value={userForm.role}
                  onChange={handleChange}
                  className="p-2 m-2 rounded-5"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <br />
              </>
            )}
            <button className="p-2 m-2 rounded-5 btn btn-primary">
              {isPage ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
