import React, { useState } from "react";
import HomePageButton from "../../NotesComponents/Buttons/HomePageButton.jsx";
import api from "../../init/api";
import UpdateButton from "../../NotesComponents/Buttons/UpdateButton.jsx";
import { useNavigate, useParams } from "react-router-dom";
export default function C3_EditUsers({ token }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log("id..:", userId);
  const classname = "form-control my-2";
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
      console.log("user ready", userId); //
      const res = await api.patch(`/api/admin/users/${userId}/edit`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Updated User: ", res.data);
      navigate("/admin/users");
      console.log("navigate")
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
            placeholder="Username of User"
            name="username"
            value={data.username}
            className={`${classname}`}
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Email of User"
            name="email"
            value={data.email}
            className={`${classname}`}
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Password of User"
            name="password"
            value={data.password}
            className={`${classname}`}
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Title of User"
            name="title"
            value={data.title}
            className={`${classname}`}
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Content of User"
            name="content"
            value={data.content}
            className={classname}
          />
          <UpdateButton userId={userId}/>
        </form>
        <br />
        <HomePageButton navigate={navigate} />
      </div>
    </div>
  );
}
