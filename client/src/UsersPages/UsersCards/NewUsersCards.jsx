import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../init/instance.js";
import PlanButton from "../../Components/Buttons/PlanButton.jsx";
import CreateButton from "../../Components/Buttons/CreateButton.jsx";
import HomePageButton from "../../Components/Buttons/HomePageButton.jsx";

export default function NewUsersCards() {
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const toShowAdmin = location?.state || "users"
  console.log("role we got: 11 ", userRole);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [data, setData] = useState({
    title: "",
    content: "",
    email: "",
    username: "",
  });
  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleCreateUser = async (e) => {
    e.preventDefault();
    console.log("Form submitted, data ready:", data);
    try {
      const res = await api.post("/admin/users/new", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User created successfully:", res.data);
      navigate("/admin/users");
    } catch (error) {
      console.error("Error response:", error.response?.data);
      setMsg(error.response?.data?.message || "Failed to create user");
    }
  };
  return (
    <div className="container">
      <h1 className="text-center"> Add Users Here by Admin </h1>
      <div className="row">
        {msg !== "" && (
          <div
            className="alert alert-danger col-12 col-lg-6 col-sm-8"
            role="alert"
          >
            {msg} &nbsp;&nbsp;&nbsp;
            <PlanButton />
          </div>
        )}
      </div>
      <div className="row justify-content-center">
        <form onSubmit={handleCreateUser} className="col-12 col-lg-6 col-md-8">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Username of User"
            name="username"
            value={data.username}
            className="form-control my-3"
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Email of User"
            name="email"
            value={data.email}
            className="form-control my-3"
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Title of User"
            name="title"
            value={data.title}
            className="form-control my-3"
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Content of User"
            name="content"
            value={data.content}
            className="form-control my-3"
          />
          <CreateButton navigate={navigate}/>
        </form>
      </div>
      <HomePageButton userRole={userRole} toShowAdmin={toShowAdmin} navigate={navigate}/>
    </div>
  );
}
