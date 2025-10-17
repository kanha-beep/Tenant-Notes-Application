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
    <div className="flex justify-center p-4">
      <div className="modern-card p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="border-l-4 border-purple-500 pl-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📝 {n?.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>👤 {n?.user?.username}</span>
            <span>🏢 {n?.tenant?.name}</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">📄 Content</h3>
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{n?.content}</p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600">👤</span>
              <span className="font-semibold text-blue-800">Owner</span>
            </div>
            <p className="text-blue-700">{n?.user?.username}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-600">🏢</span>
              <span className="font-semibold text-purple-800">Tenant</span>
            </div>
            <p className="text-purple-700">{n?.tenant?.name}</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
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
