import DeleteButton from "../../../NotesComponents/Buttons/DeleteButton.jsx";
import EditButton from "../../../NotesComponents/Buttons/EditButton.jsx";
import HomePageButton from "../../../NotesComponents/Buttons/HomePageButton.jsx";
import Checkbox from "../../../NotesComponents/Buttons/Checkbox.jsx";
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
  notesId,
}) {
  // console.log("single id...: ", n);
  console.log("__");
  return (
    <div className="row justify-content-center">
      <div
        className="m-1 p-1 rounded"
        style={{
          backgroundColor: "aqua",
          height: "20rem",
          width: "20rem",
        }}
      >
        {userRole === "admin" && toShowAdmin === "users" && (
          <>
            <div>
              <p>
                Username: <b>{n?.username} </b>
              </p>
            </div>
            <div>
              <p>
                Email: <b> {n?.email}</b>{" "}
              </p>
            </div>
            <div>
              <p>
                Id: <b> {users?._id}</b>
              </p>
            </div>
            <div>
              <p>
                Owner: <b>{users?.username} </b>
              </p>
              <p>
                tenant: <b> {users?.tenant}</b>
              </p>
            </div>
          </>
        )}{" "}
        {userRole === "admin" && toShowAdmin === "notes" && (
          <>
            <div>
              <p>
                Title: <b>{n?.title} </b>
              </p>
            </div>
            <div>
              <p>
                Content: <b> {n?.content}</b>{" "}
              </p>
            </div>
          </>
        )}
        {userRole === "user" && (
          <>
            <p>User {n?.content}</p>
          </>
        )}
        <div className="d-flex justify-content-between">
          <DeleteButton
            token={token}
            n={users}
            navigate={navigate}
            userId={userId}
          />
          <EditButton navigate={navigate} userId={userId} notesId={notesId} />
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
