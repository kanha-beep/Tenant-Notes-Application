

export default function SearchButton({
  userRole,
  // filterUsers,
  search,
  setSearch,
  onSearch,
}) {
  // console.log("value fo search: ", filterUsers);
  console.log("________")
  return (
    <div>
      <p>Search value {search}</p>
      {/* type search */}
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
