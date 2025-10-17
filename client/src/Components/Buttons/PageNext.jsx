import React from "react";

export default function PageNext({ setPage }) {
  return (
    <button
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
      onClick={() => {
        setPage((page) => {
          const nextPage = page + 1;
          console.log(`Next page ${nextPage}`);
          return nextPage;
        });
      }}
    >
      <span>Next</span>
      <span>▶️</span>
    </button>
  );
}
