import ViewButton from "../../Components/Buttons/ViewButton.jsx";

export default function AllNotesCards({
  n,
  navigate,
  userRole,
}) {
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  
  return (
    <div className="col-12 col-lg-6 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          {/* Status indicator */}
          <div className={`badge mb-3 ${
            n?.check ? 'bg-success' : 'bg-warning text-dark'
          }`}>
            {n?.check ? '✅ Completed' : '⏳ Pending'}
          </div>

          {/* admin + user */}
          {userRole === "admin" && toShowAdmin === "users" ? (
            <>
              <h5 className="card-title">👤 {n?.username}</h5>
              <div className="mb-3">
                <small className="text-muted d-block">🆔 ID: {n?._id}</small>
                <small className="text-primary fw-semibold">🏢 {n?.tenant}</small>
              </div>
              <ViewButton n={n} navigate={navigate} />
            </>
          ) : (
            <>
              <h5 className="card-title">📝 {n?.title}</h5>
              <div className="mb-3">
                <small className="text-muted d-block">🆔 ID: {n?._id}</small>
                <small className="text-muted d-block">🏢 Tenant ID: {n?.tenant._id}</small>
                <small className="text-primary fw-semibold">🏢 {n?.tenant.name}</small>
              </div>
              <ViewButton n={n} navigate={navigate} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
