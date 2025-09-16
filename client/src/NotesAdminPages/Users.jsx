/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/api"

export default function Users() {
  const [msg, setMsg] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [users, setUsers] = useState(null);
  // console.log("token:", token); // check this
  const getOneNotes = async () => {
    try {
      const res = await api.get(
        `/api/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("get one note AllNotes F: ", res.data);
      setUsers(res.data);
    } catch (e) {
      console.log("error Notes: ", e.response.data.message);
      setMsg(e.response.data.message);
    }
  };
  useEffect(() => {
    getOneNotes();
  }, []);
  return (
    <div>
      <h2> Single User</h2>
      {msg !== "" && (
        <h4 className="alert alert-danger" role="alert">
          {msg}
        </h4>
      )}
      <button onClick={() => navigate("/notes")}>Go Home</button>
      {users && (
        <div
          key={users._id}
          className="m-1 p-1"
          style={{
            backgroundColor: "aqua",
            height: "15rem",
            width: "15rem",
          }}
        >
          <div>
            <p>Username: {users?.username}</p>
          </div>
          <div>
            <p>Email: {users.email}</p>
          </div>
          <div>
            <p>Id: {users._id}</p>
          </div>
          <div>
            <p>Owner: {users?.username}</p>
            <p>tenant: {users?.tenant}</p>
          </div>
          {/* <button onClick={() => navigate(`/${n._id}`)} className="m-1">
              View{" "}
            </button> */}
          <br />
          <button onClick={() => navigate(`/admin/users/${userId}/edit`)}>Edit Page</button>
          <br /> <br/>
          <button onClick={() => navigate("/admin/users")}>Home Page</button>
        </div>
      )}
    </div>
  );
}
