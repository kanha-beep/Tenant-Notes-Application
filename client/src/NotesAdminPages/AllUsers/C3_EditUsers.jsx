import React, { useState } from "react";
import HomePageButton from "../../NotesComponents/Buttons/HomePageButton.jsx";
import api from "../../init/api";
export default function C3_EditUsers({ navigate, userId, token }) {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    title: "",
    content: "",
  });
  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleEditUsers = async (e) => {
    try {
      e.preventDefault();
      console.log("user ready", data); //
      const res = await api.post(`/api/admin/users/${userId}/edit`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("NewUsers: ", res.data);
      navigate("/admin/users");
    } catch (e) {
      console.log("error NewUsers F:", e.response.data);
    }
  };
  return (
    <div>
      <div>
        <h1> Edit Users Here </h1>
        <form onSubmit={handleEditUsers}>
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
          <input
            type="text"
            onChange={handleChange}
            placeholder="Title of User"
            name="title"
            value={data.title}
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Content of User"
            name="content"
            value={data.content}
          />
          <button> Update </button>
        </form>
        <br />
        <HomePageButton navigate={navigate} />
      </div>
    </div>
  );
}
