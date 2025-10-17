import React from "react";

export default function PagePrevious({ setPage }) {
  return (
    <div>
      {" "}
      <button
      className="ms-1 btn btn-primary me-1"
        onClick={() => {
          setPage((page) => {
            const prevPage = page - 1;
            console.log(`Previous page ${prevPage}`);
            return prevPage;
          });
        }}
      >
        Previous
      </button>
    </div>
  );
}
