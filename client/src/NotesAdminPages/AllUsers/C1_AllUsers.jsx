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
  console.log('find filter Notes: ', filterUsers)
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const [toShowAdmin, setToShowAdmin] = useState(location.state || "");
  localStorage.setItem("toShowAdmin", toShowAdmin);
  // get all users done
  const getAllUsers = async () => {
    try {
      const res = await api.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("All Users:", res.data);
      setUsers(res.data);
      setFilterUsers(res.data?.users);
      setToShowAdmin("users");
    } catch (e) {
      console.log("error in AllUsers:", e.response);
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
      setFilterNotes(res.data.notes || []);
      setIsPage(true);
      setToShowAdmin("notes");
    } catch (e) {
      console.log("error: ", e?.response?.status, e.response?.data?.message)
      // if (e.response.status === 401) {
      //   console.log("error AllNotes: ", e.response.data.message);
      // } else if (e.response.status === 403) {
      //   console.log("error AllNotes: ", e.response.data.message);
      // } else {
      //   console.log("error in users: ", e.response?.data);
      // }
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
    if (!filterUsers) return; // ❌ returning JSX inside useEffect is invalid
    const filtered = filterUsers.filter((n) => n.tenant?.name === filterTenant);
    setFilterUsers(filtered); // ✅ actually update state instead of returning JSX
  }, [filterTenant, token]);

  console.log("Admin will got to see came from dashboard ..: ", toShowAdmin);
  console.log("Admin will see filter users: ", filterNotes);
  return (
    // <div className="row justify-content-center flex-wrap">
    <div className="row" style={{ backgroundColor: "orange" }}>
      {userRole === "user" && filterNotes && (
        <>
          <h3>All Notes by Users</h3>
          <h2>{userRole}</h2>
          <div className="d-flex flex-wrap">
            {filterNotes?.map((n) => (
              <AllUsersCards
                key={n._id}
                n={n}
                navigate={navigate}
                userRole={userRole}
                filterNotes={filterNotes}
              />
            ))}
          </div>
        </>
      )}
      {userRole === "admin" &&
      toShowAdmin === "users" &&
      filterUsers?.length > 0 ? (
        <>
          <h3>All Users By Admin</h3>
          <div className="d-flex flex-wrap">
            {filterUsers?.map((u) => (
              <AllUsersCards
                key={u._id}
                n={u}
                navigate={navigate}
                userRole={userRole}
              />
            ))}
          </div>
        </>
      ) : (
        <p>Loading Users...</p>
      )}

      {userRole === "admin" &&
        toShowAdmin === "notes" &&
        filterNotes.length > 0 && (
          <>
            <h3>All Notes by Admin</h3>
            <div className="d-flex flex-wrap">
              {filterNotes?.map((n) => (
                <AllUsersCards
                  key={n._id}
                  n={n}
                  navigate={navigate}
                  userRole={userRole}
                />
              ))}
            </div>
          </>
        )}
    </div>
    // </div>
  );
}
