
export default function SortButton({
  userRole,
  toShowAdmin,
  sortBy,
  setSortBy,
}) {
  // console.log("filtered in sort: ", userRole, toShowAdmin);
  return (
    <div>
      dc
      {userRole === "admin" && toShowAdmin === "users" && (
        <>
          <label>Users By Admin</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 m-1 rounded"
          >
            <option value="">Select</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>
        </>
      )}
      {userRole === "admin" && toShowAdmin === "notes" && (
        <>
          <label>Notes by Admin</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 m-1 rounded"
          >
            <option value="">Select</option>
            <option value="content">Content</option>
            <option value="title">Title</option>
          </select>
        </>
      )}
      {userRole === "user" && (
        <>
          <label>Notes by User</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 m-1 rounded"
          >
            <option value="">Select</option>
            <option value="content">Content</option>
            <option value="title">Title</option>
          </select>
        </>
      )}
    </div>
  );
}
