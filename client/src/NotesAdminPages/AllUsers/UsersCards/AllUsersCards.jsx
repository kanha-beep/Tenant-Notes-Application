import ViewButton from "../../../NotesComponents/Buttons/ViewButton.jsx";
export default function AllUsersCards({ n, navigate, userRole }) {
  // console.log("AllUsersCards.jsx: ", filterNotes);
  return (
    <div
      key={n._id}
      style={{ backgroundColor: "aqua" }}
      className="ms-3 m-2 col-12 col-lg-5 col-md-5 rounded"
    >
      {userRole === "user" && (
        <>
          <p>
            Title: <b>{n.title} </b>
          </p>
          <p>
            {" "}
            Content: <b>{n.content} </b>
          </p>
          <ViewButton n={n} navigate={navigate} />
        </>
      )}
      {userRole === "admin" && (
        <>
          <div>
            <p>
              UserName: <b>{n?.username}</b>
            </p>
          </div>
          <div>
            <p>
              Owner Id: <b>{n?._id}</b>{" "}
            </p>
          </div>
          <div>
            <p>
              Title: <b>{n?.title} </b>
            </p>
          </div>
          <div>
            <p>
              Content: <b> {n?.content}</b>
            </p>
          </div>
          <div>
            <p>
              Id: <b>{n?._id}</b>
            </p>
            <p>
              Current tenant Name: <b>{n?.tenant}</b>
            </p>
          </div>
          <br />
          <ViewButton n={n} navigate={navigate} />
        </>
      )}
    </div>
    // {/* <C3_ViewUsers
    //         navigate={navigate}
    //         owner={owner}
    //         setOwner={setOwner}
    //         token={token}
    //         users={users}
    //         setUsers={setUsers}
    //         n={n}
    //         msg={msg}
    //         userId={userId}
    //       /> */}
  );
}
