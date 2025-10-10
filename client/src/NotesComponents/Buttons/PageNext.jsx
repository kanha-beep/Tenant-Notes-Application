import React from "react";

export default function PageNext({ setPage }) {
  return (
    <div>
      <button
        className="ms-1 btn btn-primary me-1"
        onClick={() => {
          setPage((page) => {
            const nextPage = page + 1;
            console.log(`Next page ${nextPage}`);
            return nextPage;
          });
        }}
      >
        Next
      </button>
    </div>
  );
}
