import DeleteButton from "../../Components/Buttons/DeleteButton.jsx";
import EditButton from "../../Components/Buttons/EditButton.jsx";
import HomePageButton from "../../Components/Buttons/HomePageButton.jsx";
import Checkbox from "../../Components/Buttons/Checkbox.jsx";
export default function SingleNotesCards({
  token,
  navigate,
  n,
  setCheck,
  check,
  noteId,
}) {
  const userRole = localStorage.getItem("role");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  
  return (
    <div className="d-flex justify-content-center p-4">
      <div className="card shadow-lg p-4" style={{ maxWidth: '600px', width: '100%' }}>
        {/* Header */}
        <div className="border-start border-primary border-4 ps-3 mb-4">
          <h1 className="h3 fw-bold text-dark mb-2">📝 {n?.title}</h1>
          <div className="d-flex align-items-center gap-3 small text-muted">
            <span>👤 {n?.user?.username}</span>
            <span>🏢 {n?.tenant?.name}</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-light rounded p-4 mb-4">
          <h5 className="fw-semibold text-secondary mb-3">📄 Content</h5>
          <p className="text-dark" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{n?.content}</p>
        </div>

        {/* Metadata */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6">
            <div className="bg-primary bg-opacity-10 rounded p-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="text-primary">👤</span>
                <span className="fw-semibold text-primary">Owner</span>
              </div>
              <p className="text-primary mb-0">{n?.user?.username}</p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="bg-info bg-opacity-10 rounded p-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="text-info">🏢</span>
                <span className="fw-semibold text-info">Tenant</span>
              </div>
              <p className="text-info mb-0">{n?.tenant?.name}</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="d-flex flex-wrap gap-2 pt-3 border-top">
          <DeleteButton
            token={token}
            n={n}
            navigate={navigate}
            userRole={userRole}
            toShowAdmin={toShowAdmin}
          />
          <EditButton
            navigate={navigate}
            userId={noteId}
            noteId={noteId}
            userRole={userRole}
          />
          <HomePageButton
            navigate={navigate}
            toShowAdmin={toShowAdmin}
            userRole={userRole}
          />
          <Checkbox
            check={check}
            setCheck={setCheck}
            toShowAdmin={toShowAdmin}
          />
        </div>
      </div>
    </div>
  );
}
