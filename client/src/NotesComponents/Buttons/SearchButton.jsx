// import { useState } from "react";
// import api from "../../init/api";

export default function SearchButton({
  // token,
  // setUsers,
  // setNotes,
  userRole,
  // setFilterNotes,
  // setFilterUsers,
  // toShowAdmin,
  filterUsers,
  search,
  setSearch,
  onSearch,
}) {
  // const handleSearch = async (e) => {
  //   const val = e.target.value;
  //   setSearch(val);
  //   if (userRole === "admin") {
  //     if (toShowAdmin === "users") {
  //       console.log("1. search value by admin: ", search);
  //       const res = await api.get(`/api/admin/users?search=${search}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       console.log("1.searched user", res.data);
  //       setFilterUsers(res.data)
  //       setUsers(res.data);
  //       setSearch("");
  //     } else if (toShowAdmin === "notes") {
  //       const res = await api.get(`/api/notes?search=${search}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       // console.log("searched user", res.data);
  //       setFilterNotes(res.data.notes || []);
  //       setSearch("");
  //     }
  //   }
  console.log("value fo search: ", filterUsers);
  console.log("________")
  return (
    <div>
      <p>Search value {search}</p>
      <input
        type="text"
        placeholder={`${
          userRole === "admin" ? "Search User" : "Search Notes by Title"
        }`}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button
        onClick={() => {
          onSearch();
        }}
      >
        Search
      </button>
    </div>
  );
}
