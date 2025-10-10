import React, { useEffect, useState } from "react";
import PagePrevious from "./PagePrevious";
import PageNext from "./PageNext";
import api from "../../init/api";
import SortButton from "./SortButton";
import SearchButton from "./SearchButton";

export default function PageButtons({
  token,
  setFilterNotes,
  userRole,
  setUsers,
  setNotes,
  filterNotes,
  toShowAdmin,
  setToShowAdmin,
  setFilterUsers,
}) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const handlePage = async () => {
    if (userRole === "user") {
      const res = await api.get(
        `/api/notes?page=${page}&search=${search}&sort=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setTotalNotes(res.data.totalNotes);
      setFilterNotes(res.data.notes);
      console.log("1. pagination: ", res.data);
    } else {
      try {
        if (toShowAdmin === "users") {
          console.log("start search");
          const res = await api.get(
            `/api/admin/users?page=${page}&search=${search}&sort=${sortBy}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("end search: ", res.data);
          setPage(res.data.page);
          setTotalPages(res.data.totalPages);
          setTotalNotes(res.data.totalUsers);
          setFilterUsers(res.data.users);
          console.log("users admin ", res.data.users);
        } else {
          const res = await api.get(
            `/api/notes?page=${page}&search=${search}&sort=${sortBy}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
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
  //   useEffect(() => {
  //     if (sortBy) handlePage();
  //   }, [sortBy]);
  useEffect(() => {
    handlePage();
  }, [page, sortBy, toShowAdmin, search]);
  return (
    <div className="row">
      {userRole === "admin" && toShowAdmin === "notes" && (
        <p>Total Notes: {totalNotes}</p>
      )}
      {userRole === "admin" && toShowAdmin === "users" && (
        <p>Total Users: {totalNotes}</p>
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
