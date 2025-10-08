import React, { useState } from "react";
import api from "../../init/api";

export default function SortButton({
  token,
  userRole,
  filterUsers,
  setFilterUsers,
  setFilterNotes,
  toShowAdmin,
  // setToShowAdmin,
}) {
  const [sortBy, setSortBy] = useState("");
  const sortedTasks = async (e) => {
    const value = e.target.value;
    setSortBy(value);
    if (userRole === "admin") {
      if (toShowAdmin === "users") {
        try {
          console.log("value of sort: ", value);
          const res = await api.get(`/api/admin/users?sort=${value}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("1. sorted users: ", res.data);
          setFilterUsers(res.data);
          // setFilterNotes(res.data);
          // console.log("sort Button: ", res.data);
        } catch (e) {
          console.log("error sort: ", e.response?.data || e.message);
        }
      } else {
        //notes by admin
        try {
          console.log("value of sort: ", value);
          const res = await api.get(`/api/notes?sort=${value}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("2. sorted notes: ", res.data);
          setFilterNotes(res.data);
          // setFilterNotes(res.data);
          // console.log("sort Button: ", res.data);
        } catch (e) {
          console.log("error sort: ", e.response?.data || e.message);
        }
      }
    } else {
      try {
        console.log("value of sort: ", value);
        const res = await api.get(`/api/notes?sort=${value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("3. sorted notes: ", res.data);
        setFilterNotes(res.data);
        // setFilterNotes(res.data);
        // console.log("sort Button: ", res.data);
      } catch (e) {
        console.log("error sort: ", e.response?.data || e.message);
      }
    }
  };
  console.log("filtered in sort: ", sortBy);
  return (
    <div>
      {userRole === "admin" && toShowAdmin === "users" && (
        <>
          <label>Users By Admin</label>
          <select
            value={sortBy}
            onChange={sortedTasks}
            className="p-2 m-1 rounded"
          >
            <option value="">Select</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>
        </>
      )}
      {userRole === "admin" && toShowAdmin === "notes" && (
        <>
          <label>Notes by Admin</label>
          <select
            value={sortBy}
            onChange={sortedTasks}
            className="p-2 m-1 rounded"
          >
            <option value="">Select</option>
            <option value="content">Content</option>
            <option value="title">Title</option>
          </select>
        </>
      )}
      {userRole === "user" && (
        <>
          <label>Notes by User</label>
          <select
            value={sortBy}
            onChange={sortedTasks}
            className="p-2 m-1 rounded"
          >
            <option value="">Select</option>
            <option value="content">Content</option>
            <option value="title">Title</option>
          </select>
        </>
      )}
    </div>
  );
}
