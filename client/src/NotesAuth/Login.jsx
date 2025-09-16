import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
// import * as jwt_decode from "jwt-decode";
import api from "../init/api"

export default function Login({ setIsLoggedIn }) {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    tenant: "",
  });
  const handleChange = (e) => {
    setUserForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      // console.log("1. data ready for login", userForm); //
      const res = await api.post(
        "/api/notes/auth/login",
        userForm
      );
      console.log("Login B done now F");
      const token = res.data;
      const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          console.log("error in ADMIN LOGIN:", e);
          return null;
        }
      };
      const decoded = parseJwt(token);
      console.log(decoded);
      const role = decoded.role;
      console.log("decoding done");
      // console.log("2. type of token LOGIN F: ", typeof token);
      localStorage.setItem("tokens", token);
      setIsLoggedIn(true);
      // console.log("3. token LOGIN F: ", localStorage.getItem("tokens")); //
      // console.log("2. tenant type", typeof userForm.tenant);
      localStorage.setItem("tenant", userForm.tenant);
      // console.log("2. tenant saved LOGIN F,",);
      localStorage.getItem("tenant");
      // console.log("3. got tenant LOGIN F to checK: ", tenant);
      // console.log("res.data type:", typeof res.data);
      // const decoded = jwt_decode(token);
      // console.log("decoded: ", decoded);
      // // const decoded = jwt_decode(token);
      // console.log("middle decode");
      // localStorage.setItem("tenant", JSON.stringify(decoded.tenant));
      // console.log(JSON.stringify(res.data));
      // console.log("end decode");
      console.log("role check starts");
      if (role === "admin") {
        console.log("role check");
        navigate("/admin/dashboard"); // go to admin dashboard
      } else {
        navigate("/notes"); // go to normal notes page
      }
    } catch (e) {
      if (e.status === 401) {
        console.log("error while login", e.response.data);
        navigate("/signup", {
          state: {
            alert: "danger",
            message: "First Sign Up",
          },
        });
      } else if (e.status === 402) {
        console.log("error while login", e.response.data);
        navigate("/login", {
          state: {
            alert: "danger",
            message: "Wrong Password",
          },
        });
        setMsg(e.response.data);
      } else if (e.status === 403) {
        console.log("error while login", e.response.data);
        navigate("/login", {
          state: {
            alert: "danger",
            message: "No Tenant Exist Already Please Sign Up",
          },
        });
        setMsg(e.response.data);
      }
    }
  };
  return (
    <div>
      <div> Login </div>
      {msg !== "" && <div className="alert alert-danger" role="alert">{msg}</div>}
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Email"
            name="email"
            value={userForm.email}
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Password"
            name="password"
            value={userForm.password}
          />{" "}
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
          <button>Login </button>
        </form>
      </div>
    </div>
  );
}
