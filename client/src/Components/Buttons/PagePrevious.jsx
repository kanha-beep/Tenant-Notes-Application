import React from "react";

export default function PagePrevious({ setPage }) {
  return (
    <button
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-300 active:scale-95"
      onClick={() => {
        setPage((page) => {
          const prevPage = page - 1;
          console.log(`Previous page ${prevPage}`);
          return prevPage;
        });
      }}
    >
      <span>◀️</span>
      <span>Previous</span>
    </button>
  );
}
