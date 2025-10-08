import React, { useState } from "react";
import DeleteButton from "../../../NotesComponents/Buttons/DeleteButton.jsx";
import EditButton from "../../../NotesComponents/Buttons/EditButton.jsx";
import HomePageButton from "../../../NotesComponents/Buttons/HomePageButton.jsx";
import Checkbox from "../../../NotesComponents/Buttons/Checkbox.jsx";
export default function SingleUsersCards({
  users,
  token,
  navigate,
  notes,
  userRole,
  onClick,
}) {
  // const handleCheckBox = (e) => {
  //   if (onClick) onClick(e.target.checked);
  // };
  return (
    <div>
      start
      <div
        key={users?._id}
        className="m-1 p-1"
        style={{
          backgroundColor: "aqua",
          height: "15rem",
          width: "15rem",
        }}
      >
        {userRole === "admin" && (
          <>
            <div>
              <p>
                Email: <b>{users?.username} </b>
              </p>
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
          </>
        )}{" "}
        {userRole === "user" && (
          <>
            <p>User {notes?.content}</p>
          </>
        )}
        {/* <button onClick={() => navigate(`/${n._id}`)} className="m-1">
              View{" "}
            </button> */}
        <DeleteButton token={token} n={users} navigate={navigate} />
        <EditButton navigate={navigate} />
        <HomePageButton navigate={navigate} />
        {/* <Checkbox onChange={(val) => setChecked(val)} />
        {checked?"done":"pending" } */}
        <input
          type="checkbox"
          onChange={() => onClick && onClick("send")}
        />
      </div>
    </div>
  );
}
