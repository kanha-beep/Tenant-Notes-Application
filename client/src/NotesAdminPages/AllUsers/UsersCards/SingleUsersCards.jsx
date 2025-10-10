import DeleteButton from "../../../NotesComponents/Buttons/DeleteButton.jsx";
import EditButton from "../../../NotesComponents/Buttons/EditButton.jsx";
import HomePageButton from "../../../NotesComponents/Buttons/HomePageButton.jsx";
import Checkbox from "../../../NotesComponents/Buttons/Checkbox.jsx";
export default function SingleUsersCards({
  users,
  token,
  navigate,
  notes,
  userRole,
  setCheck,
  check,
  toShowAdmin,
  userId
}) {
  console.log("single id...: ", userId)
  console.log("__")
  return (
    <div>
      <div
        className="m-1 p-1 rounded col-12 col-md-5 col-lg-5"
        style={{
          backgroundColor: "aqua",
          height: "20rem",
          width: "20rem",
        }}
      >
        {userRole === "admin" && (
          <>
            <div>
              <p>
                Username: <b>{users?.username} </b>
              </p>
            </div>
            <div>
              <p>
                Email: <b> {users?.email}</b>{" "}
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
        {userRole === "user" && (
          <>
            <p>User {notes?.content}</p>
          </>
        )}
        <div className="d-flex justify-content-between">
          <DeleteButton token={token} n={users} navigate={navigate} userId={userId} />
          <EditButton navigate={navigate} userId={userId}/>
          <HomePageButton navigate={navigate} />
          <Checkbox check={check} setCheck={setCheck} toShowAdmin={toShowAdmin}/>
        </div>
      </div>
    </div>
  );
}
