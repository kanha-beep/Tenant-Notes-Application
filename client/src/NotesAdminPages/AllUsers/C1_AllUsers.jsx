/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import api from "../../init/api";
import AllUsersCards from "./UsersCards/AllUsersCards.jsx";
import { useLocation } from "react-router-dom";
export default function C1_AllUsers({
  navigate,
  setIsPage,
  token,
  setUsers,
  filterTenant,
  setFilterNotes,
  filterNotes,
  setFilterUsers,
  filterUsers,
}) {
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const [toShowAdmin, setToShowAdmin] = useState(location.state);
  // get all users done
  const getAllUsers = async () => {
    try {
      const res = await api.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("All Users:", res.data);
      setUsers(res.data);
      setFilterUsers(res.data);
      setToShowAdmin("users");
    } catch (e) {
      console.log("error in AllUsers:", e.response?.data);
    }
  };
  //get all notes
  const getAllNotes = async () => {
    try {
      const res = await api.get(`/api/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("1. AllNotes ", res.data);
      setFilterNotes(res.data);
      setIsPage(true);
      setToShowAdmin("notes");
    } catch (e) {
      if (e.response.status === 401) {
        console.log("error AllNotes: ", e.response.data);
      } else if (e.response.status === 403) {
        console.log("error AllNotes: ", e.response.data.message);
      } else {
        console.log("error in users: ", e.response?.data);
      }
    }
  };
  //call all users or notes
  useEffect(() => {
    if (userRole === "admin") {
      if (toShowAdmin === "users") getAllUsers();
      else {
        // console.log("now all notes");
        setToShowAdmin("notes");
        getAllNotes();
      }
    } else {
      getAllNotes();
    }
  }, [token]);
  useEffect(() => {
    if (!filterUsers) return <h2>Loading...</h2>;
    filterUsers.filter((n) => {
      return n.tenant?.name === filterTenant;
    });
  }, [filterTenant, token]);
  console.log("Admin will see: ", toShowAdmin);
  // console.log("userRole: ", userRole);
  return (
    <div className="row" style={{ backgroundColor: "orange" }}>
      {userRole === "user" && filterNotes && (
        <>
          <h3>All Notes by Users</h3>
          <h2>{userRole}</h2>
          {filterNotes?.map((n) => (
            <AllUsersCards
              key={n._id}
              n={n}
              navigate={navigate}
              userRole={userRole}
              filterNotes={filterNotes}
            />
          ))}
        </>
      )}
      {userRole === "admin" &&
        toShowAdmin === "users" &&
        filterUsers.length > 0 ? (
          <>
            <h3>All Users By Admin</h3>
            {filterUsers.map((u) => (
              <AllUsersCards
                key={u._id}
                n={u}
                navigate={navigate}
                userRole={userRole}
              />
            ))}
          </>
        ): <p>Loading Users...</p>}

      {userRole === "admin" && toShowAdmin === "notes" && filterNotes && (
        <>
          <h3>All Notes by Admin</h3>
          {filterNotes.map((n) => (
            <AllUsersCards
              key={n._id}
              n={n}
              navigate={navigate}
              userRole={userRole}
            />
          ))}
        </>
      )}
    </div>
  );
}
