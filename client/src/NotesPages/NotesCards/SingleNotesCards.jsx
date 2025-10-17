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
  console.log("single id...: ", n);
  const userRole = localStorage.getItem("role");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  console.log("got final notes: ", userRole, toShowAdmin);
  return (
    <div className="row justify-content-center">
      <div
        className="m-1 p-1 rounded"
        style={{
          backgroundColor: "aqua",
          height: "20rem",
        }}
      >
        {/* notes display for all users */}
        <>
          <p>
            Title: <b>{n?.title} </b>
          </p>
          <p>
            Content: <b> {n?.content}</b>{" "}
          </p>
          <p>
            Owner: <b>{n?.user?.username} </b>
          </p>
          <p>
            Tenant: <b> {n?.tenant?.name}</b>
          </p>
        </>
        
        <div className="d-flex justify-content-between">
          <DeleteButton
            token={token}
            n={n}
            navigate={navigate}
            userRole={userRole}
            toShowAdmin={toShowAdmin}
          />
          {/* edit button */}
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
