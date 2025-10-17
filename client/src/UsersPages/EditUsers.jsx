import React, { useState } from "react";
import HomePageButton from "../Components/Buttons/HomePageButton.jsx";
import api from "../init/instance.js";
import UpdateButton from "../Components/Buttons/UpdateButton.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
export default function EditUsers({ token }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log("id..:", userId);
  const classname = "form-control my-2";
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // get user
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get(`/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("user found: ", res.data);
        setData(res.data);
      } catch (e) {
        console.log("error in getting user: ", e.response.data);
      }
    };
    getUser();
  }, []);
  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  // edit user
  const handleEditUsers = async (e) => {
    try {
      e.preventDefault();
      console.log("user ready", userId); //
      const res = await api.patch(`/admin/users/${userId}/edit`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Updated User: ", res.data);
      navigate(`/admin/users/${userId}`);
      console.log("navigate");
    } catch (e) {
      console.log("error NewUsers F:", e.response.data);
    }
  };
  return (
    <div className="row justify-content-center">
      <h1 className="text-center"> Edit Users Here </h1>
      <div className="col-6 col-md-6 col-lg-5 bg-dark">
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

          <UpdateButton userId={userId} />
        </form>
        <br />
        <HomePageButton navigate={navigate} />
      </div>
    </div>
  );
}
