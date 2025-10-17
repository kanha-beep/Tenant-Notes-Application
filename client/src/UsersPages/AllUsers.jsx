/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import api from "../init/instance.js";
import AllUsersCards from "./UsersCards/AllUsersCards.jsx";
export default function AllUsers({
  navigate,
  token,
  setUsers,
  filterTenant,
  setFilterUsers,
  filterUsers,
  toShowAdmin,
  setToShowAdmin,
}) {
  console.log("find filter Users: ", filterUsers);
  const userRole = localStorage.getItem("role");
  // get all users done
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await api.get("/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
        setFilterUsers(res.data?.users);
        setToShowAdmin("users");
      } catch (e) {
        console.log("error in AllUsers:", e.response);
      }
    };
    getAllUsers();
  }, [token]);
  useEffect(() => {
    if (!filterUsers) return;
    const filtered = filterUsers.filter((n) => n.tenant?.name === filterTenant);
    setFilterUsers(filtered);
  }, [filterTenant, token]);
  return (
    <div className="row mt-4">
      {/* admin + users */}
      {userRole === "admin" &&
      toShowAdmin === "users" &&
      filterUsers?.length > 0 ? (
        filterUsers?.map((u) => (
          <AllUsersCards
            key={u._id}
            n={u}
            navigate={navigate}
            userRole={userRole}
            filterUsers={filterUsers}
          />
        ))
      ) : (
        <div className="col-12 text-center py-5">
          <p className="text-muted">Loading Users...</p>
        </div>
      )}
    </div>
  );
}
