import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../init/api"

export default function NewUsers() {
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleCreateUser = async (e) => {
    try {
      e.preventDefault();
      console.log("user ready", data); //
      const res = await api.post(
        "/api/admin/users/new",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("NewUsers: ", res.data);
      navigate("/admin/users");
    } catch (e) {
      console.log("error NewUsers F:", e.response.data);
    }
  };
  return (
    <div>
      <h1> Add Users Here </h1>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Name of User"
          name="username"
          value={data.username}
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="Email of User"
          name="email"
          value={data.email}
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="Password of User"
          name="password"
          value={data.password}
        />
        <button>Create </button>
      </form>
      <button
        onClick={() => {
          navigate("/admin/users");
        }}
      >
        HomePage
      </button>
    </div>
  );
}
