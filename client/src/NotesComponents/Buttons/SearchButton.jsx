import { useState } from "react";
import api from "../../init/api";

export default function SearchButton({
  token,
  setUsers,
  // setNotes,
  userRole,
  setFilterNotes,
  setFilterUsers,
  toShowAdmin,
  filterUsers
}) {
  const [search, setSearch] = useState("");

  // console.log("current role: ", userRole)
  //user done
  const handleSearch = async (e) => {
    const val = e.target.value;
    setSearch(val);
    if (userRole === "admin") {
      if (toShowAdmin === "users") {
        console.log("1. search value by admin: ", search);
        const res = await api.get(`/api/admin/users?search=${search}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("1.searched user", res.data);
        setFilterUsers(res.data)
        setUsers(res.data);
        setSearch("");
      } else if (toShowAdmin === "notes") {
        const res = await api.get(`/api/notes?search=${search}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("searched user", res.data);
        setFilterNotes(res.data);
        setSearch("");
      }
    } else {
      //note
      try {
        console.log("1. search by user: ", search);
        const res = await api.get(`/api/notes?search=${search}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("2. search note: ", res.data);
        setFilterNotes(res.data);
      } catch (e) {
        console.log("error: ", e.response.data);
      }
    }
  };
  console.log("value fo search: ", filterUsers);
  return (
    <div>
      <input
        type="text"
        placeholder={`${userRole === "admin" ? "Search User" : "Search Notes by Title"}`}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
