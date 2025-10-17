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
    <div className="row" style={{ backgroundColor: "orange" }}>
      {/* admin + users */}
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
                filterUsers={filterUsers}
              />
            ))}
          </div>
        </>
      ) : (
        <p>Loading Users...</p>
      )}
    </div>
  );
}
