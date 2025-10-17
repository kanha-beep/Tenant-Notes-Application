import React, { useEffect, useState } from "react";
import PagePrevious from "./PagePrevious";
import PageNext from "./PageNext";
import api from "../../init/instance.js";
import SortButton from "./SortButton.jsx";
import SearchButton from "./SearchButton.jsx";

export default function PageButtons({
  token,
  setFilterNotes,
  userRole,
  setUsers,
  setNotes,
  filterNotes,
  setFilterUsers,
  toShowAdmin,
  setToShowAdmin,
  
}) {
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const handlePage = async () => {
    // user
    if (userRole === "user") {
      const res = await api.get(
        `/notes?page=${page}&search=${search}&sort=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("1. pagination: role=users", res.data.users);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setTotalNotes(res.data.totalNotes);
      setFilterNotes(res.data.notes);
    } else {
      try {
        // admin + users
        if (toShowAdmin === "users") {
          const res = await api.get(
            `/admin/users?page=${page}&search=${search}&sort=${sortBy}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(
            "2. pagination search: role=admin show=users",
            res.data.users
          );
          setPage(res.data.page);
          setTotalPages(res.data.totalPages);
          setTotalUsers(res.data.totalNoOfUsers);
          setFilterUsers(res.data.users);
          setFilterNotes([]); // Clear notes when showing users
          setSearch("");
        } else {
          // admin + notes
          const res = await api.get(
            `/notes?page=${page}&search=${search}&sort=${sortBy}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(
            "3. pagination search: role=admin show=notes",
            res.data
          );
          setPage(res.data.page);
          setTotalPages(res.data.totalPages);
          setTotalNotes(res.data.totalNotes);
          setFilterNotes(res.data.notes);
        }
      } catch (e) {
        console.log("error in pagination: ", e.response.data);
      }
    }
  };
  useEffect(() => {
    handlePage();
  }, [page, sortBy, toShowAdmin]);

  useEffect(() => {
    setPage(1); // Reset to page 1 when switching between users and notes
  }, [toShowAdmin]);
  // console.log("all users: ", filterNotes)
  return (
    <div className="row">
      {userRole === "admin" && toShowAdmin === "notes" && (
        <p>Total Notes: {totalNotes}</p>
      )}
      {userRole === "admin" && toShowAdmin === "users" && (
        <p>Total Users: {totalUsers}</p>
      )}
      {userRole === "user" && <p>Total Notes: {totalNotes}</p>}
      <p>
        {page}/{totalPages}
      </p>
      <SearchButton
        userRole={userRole}
        token={token}
        setUsers={setUsers}
        setNotes={setNotes}
        toShowAdmin={toShowAdmin}
        setToShowAdmin={setToShowAdmin}
        setFilterNotes={setFilterNotes}
        search={search}
        setSearch={setSearch}
        onSearch={handlePage}
      />
      <SortButton
        userRole={userRole}
        token={token}
        setUsers={setUsers}
        setNotes={setNotes}
        setFilterNotes={setFilterNotes}
        filterNotes={filterNotes}
        toShowAdmin={toShowAdmin}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onSort={handlePage}
        className="p-10"
      />
      <span className="d-flex m-1">
        <PagePrevious setPage={setPage} />
        <PageNext setPage={setPage} />
      </span>
    </div>
  );
}
