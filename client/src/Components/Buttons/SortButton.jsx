
export default function SortButton({
  userRole,
  toShowAdmin,
  sortBy,
  setSortBy,
}) {
  const getLabel = () => {
    if (userRole === "admin" && toShowAdmin === "users") return "👥 Sort Users";
    if (userRole === "admin" && toShowAdmin === "notes") return "📝 Sort Notes (Admin)";
    return "📝 Sort Notes";
  };

  const getOptions = () => {
    if (userRole === "admin" && toShowAdmin === "users") {
      return [
        { value: "", label: "📋 Select Sort" },
        { value: "username", label: "👤 Username" },
        { value: "email", label: "📧 Email" }
      ];
    }
    return [
      { value: "", label: "📋 Select Sort" },
      { value: "content", label: "📄 Content" },
      { value: "title", label: "📌 Title" }
    ];
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 order-lg-1 mb-3">
      <label className="form-label fw-semibold text-dark">{getLabel()}</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="form-select form-select-lg shadow-sm"
      >
        {getOptions().map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
