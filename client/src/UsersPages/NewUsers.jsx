import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import NewUsersCards from "./UsersCards/NewUsersCards.jsx";
import Msg from "../Components/AlertBoxes/Msg";
import { useParams } from "react-router-dom";

export default function NewUsers({ msg, token }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  console.log("userId: ", userId);
  // useEffect(() => {
  //   const getSingleUser = async () => {
  //     const res = await api.get(`/admin/users/${userId}`, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("tokens")}` },
  //     });
  //     console.log("single user: ", res.data);
  //     setUsers(res.data);
  //   };
  //   getSingleUser();
  // }, []);
  console.log("users: ", users);
  return (
    <div className="row">
      <Msg msg={msg} />
      {/* <div className="col-12 col-md-5 col-lg-10"> */}
        {users && (
          <NewUsersCards
            users={users}
            setUsers={setUsers}
            token={token}
            navigate={navigate}
            n={users}
          />
        )}
      {/* </div> */}
    </div>
  );
}
