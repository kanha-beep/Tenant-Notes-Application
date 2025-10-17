import DeleteButton from "../../Components/Buttons/DeleteButton.jsx";
import EditButton from "../../Components/Buttons/EditButton.jsx";
import HomePageButton from "../../Components/Buttons/HomePageButton.jsx";
import Checkbox from "../../Components/Buttons/Checkbox.jsx";
export default function SingleUsersCards({
  users,
  token,
  navigate,
  n,
  userRole,
  setCheck,
  check,
  toShowAdmin,
  userId,
  noteId,
}) {
  return (
    <div className="flex justify-center p-4">
      <div className="modern-card p-8 max-w-xl w-full">
        {/* admin + users */}
        {userRole === "admin" && toShowAdmin === "users" && (
          <>
            {/* Header */}
            <div className="border-l-4 border-blue-500 pl-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">👤 {n?.username}</h1>
              <p className="text-gray-600">📧 {n?.email}</p>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-600">🆔</span>
                  <span className="font-semibold text-blue-800">User ID</span>
                </div>
                <p className="font-mono text-sm bg-white px-3 py-2 rounded border">{users?._id}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-600">🏢</span>
                  <span className="font-semibold text-purple-800">Tenant</span>
                </div>
                <p className="text-purple-700 font-semibold">{users?.tenant}</p>
              </div>
            </div>
          </>
        )}
        
        {/* admin + notes */}
        {userRole === "admin" && toShowAdmin === "notes" && (
          <>
            <div className="border-l-4 border-purple-500 pl-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">📝 {n?.title}</h1>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">📄 Content</h3>
              <p className="text-gray-800 leading-relaxed">{n?.content}</p>
            </div>
          </>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
          <DeleteButton
            token={token}
            n={users}
            navigate={navigate}
            userId={userId}
            toShowAdmin={toShowAdmin}
            userRole={userRole}
          />
          <EditButton navigate={navigate} userId={userId} noteId={noteId} />
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
