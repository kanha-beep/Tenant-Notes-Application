

export default function SearchButton({
  userRole,
  search,
  setSearch,
  onSearch,
}) {
  return (
    <div className="col-12 col-md-6 col-lg-8 order-lg-2 mb-4">
      <div className="row g-3">
        <div className="col-12 col-sm-8">
          <label className="form-label fw-semibold text-dark">
            🔍 {userRole === "admin" ? "Search Users" : "Search Notes"}
          </label>
          <input
            type="text"
            placeholder={userRole === "admin" ? "👤 Search User..." : "📝 Search Notes by Title..."}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="form-control form-control-lg shadow-sm"
          />
        </div>
        <div className="col-12 col-sm-4 d-flex align-items-end">
          <button
            onClick={onSearch}
            className="btn btn-primary d-flex align-items-center gap-2 px-3 py-2 fw-semibold w-100 shadow"
          >
            <span>🔍</span>
            <span>Search</span>
          </button>
        </div>
      </div>
      {search && (
        <div className="alert alert-info mt-3 d-flex align-items-center gap-2">
          <span>🔎</span>
          <span>Searching for: <strong>{search}</strong></span>
        </div>
      )}
    </div>
  );
}
