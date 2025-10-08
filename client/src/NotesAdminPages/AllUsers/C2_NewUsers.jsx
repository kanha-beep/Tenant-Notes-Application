import React, { useEffect, useState } from "react";
import NewUsersCards from "./UsersCards/NewUsersCards";
import Msg from "./AlertBoxes/Msg";
import api from "../../init/api";
import { useParams } from "react-router-dom";

export default function C2_NewUsers({ navigate, msg, token }) {
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  console.log("userId: ", userId);
  useEffect(() => {
    const getSingleUser = async () => {
      const res = await api.get(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("tokens")}` },
      });
      console.log("single user: ", res.data);
      setUsers(res.data)
    };
    getSingleUser();
  }, []);
  console.log("users: ", users);
  return (
    <div>
      <Msg msg={msg} />
      {users && (
        <NewUsersCards
          users={users}
          token={token}
          navigate={navigate}
          n={users}
        />
      )}
      <br />
      card ends
    </div>
  );
}
