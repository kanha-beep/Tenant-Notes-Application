import React, { useEffect, useState } from "react";

import api from "../../init/instance.js";
import SortButton from "./SortButton.jsx";
import SearchButton from "./SearchButton.jsx";

export default function PageButtons({
  token,
  setFilterNotes,
  userRole,
  setFilterUsers,
  toShowAdmin,
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
  
  const isUsers = userRole === "admin" && toShowAdmin === "users";
  const totalCount = isUsers ? totalUsers : totalNotes;
  const itemType = isUsers ? "Users" : "Notes";



  return (
    <>
      {/* Search and Sort Section */}
      <div className="row mb-4">
        <SearchButton
          userRole={userRole}
          search={search}
          setSearch={setSearch}
          onSearch={handlePage}
        />
        <SortButton
          userRole={userRole}
          toShowAdmin={toShowAdmin}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Bottom Pagination */}
      <div className="container-fluid mt-5 py-4 bg-light border-top">
        <div className="row align-items-center">
          {/* Stats */}
          <div className="col-md-6">
            <p className="text-muted mb-0">
              <span className="me-2">{isUsers ? "👥" : "📝"}</span>
              Total {totalCount} {itemType.toLowerCase()}
            </p>
          </div>
          
          {/* Pagination */}
          <div className="col-md-6">
            <div className="d-flex justify-content-md-end justify-content-center">
              <small className="text-muted me-3">Page {page} of {totalPages}</small>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  {/* Previous Button */}
                  <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                    >
                      ◀️ Previous
                    </button>
                  </li>
                  
                  {/* Page Numbers */}
                  {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                    const pageNum = Math.max(1, page - 2) + i;
                    if (pageNum > totalPages) return null;
                    return (
                      <li key={pageNum} className={`page-item ${pageNum === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setPage(pageNum)}>{pageNum}</button>
                      </li>
                    );
                  })}
                  
                  {/* Next Button */}
                  <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                    >
                      Next ▶️
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
