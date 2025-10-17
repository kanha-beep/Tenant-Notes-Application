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
        {/* admin + users */}
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
        {/* admin + notes */}
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
        <div className="d-flex justify-content-between">
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
