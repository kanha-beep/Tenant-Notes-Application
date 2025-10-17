/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import api from "../init/instance.js";
import Msg from "../Components/AlertBoxes/Msg.jsx";
import SingleUsersCards from "./UsersCards/SingleUsersCards.jsx";
import { useNavigate, useParams } from "react-router-dom";
export default function SingleUsers() {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [users, setUsers] = useState(null);
  // const [notes, setNotes] = useState(null);
  const [msg, setMsg] = useState("");
  const { userId, noteId } = useParams();
  // const [check, setCheck] = useState("");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  //admin + users
  useEffect(() => {
    const getOneUser = async () => {
      try {
        const res = await api.get(`/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("get one note AllNotes F: ", res.data);
        setUsers(res.data);
      } catch (e) {
        console.log("error Notes: ", e.response.data.message);
        setMsg(e.response.data.message);
      }
    };
    getOneUser();
  }, []);
  //update function
  // useEffect(() => {
  //   if (check === "") return;
  //   const updateOneTasks = async () => {
  //     try {
  //       const res = await api.patch(
  //         `/notes/${noteId}`,
  //         { check: check },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       // console.log("updated Note: ", res.data);
  //       setUsers(res.data);
  //     } catch (e) {
  //       console.log("error Notes: ", e.response.data.message);
  //       setMsg(e.response.data.message);
  //     }
  //   };
  //   updateOneTasks();
  // }, [check]);
  //auto checks the updated value on render
  // useEffect(() => {
  //   if (notes) setCheck(notes.check);
  // }, [notes]);
  return (
    <div className="row justify-content-center">
      {/* head */}
      {userRole === "admin" && toShowAdmin === "users" && (
        <h2 className="text-center">Single User</h2>
      )}
      <div className="col-10 col-md-10 col-lg-10 bg-dark">
        <Msg msg={msg} />
        {/* admin + users */}
        {userRole === "admin" && toShowAdmin === "users" && (
          <SingleUsersCards
            users={users}
            token={token}
            navigate={navigate}
            key={users?._id}
            n={users}
            userRole={userRole}
            // setCheck={setCheck}
            toShowAdmin={toShowAdmin}
            userId={userId}
            noteId={noteId}
          />
        )}
      </div>
    </div>
  );
}
