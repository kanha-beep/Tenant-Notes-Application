import ViewButton from "../../../NotesComponents/Buttons/ViewButton.jsx";
export default function AllUsersCards({ n, navigate, userRole }) {
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  // console.log("AllUsersCards.jsx: ", n);
  return (
    <div
      key={n?._id}
      style={{ backgroundColor: `${n?.check ? "lightgreen" : "red"}` }}
      className="ms-3 m-2 col-11 col-lg-5 col-md-5 rounded"
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
          <p>
            Status: <b>{n?.check ? "Done" : "Pending"} </b>
          </p>
          <ViewButton n={n} navigate={navigate} />
        </>
      )}
      {userRole === "admin" && toShowAdmin === "users" ? (
        <div className="p-2">
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
              Note Id: <b>{n?._id}</b>
            </p>
            <p>
              Current tenant Name: <b>{n?.tenant}</b>
            </p>
          </div>
          <br />
          <ViewButton n={n} navigate={navigate} />
        </div>
      ) : (
        <div className="p-2">
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
              Note Id: <b>{n?._id}</b>
            </p>
            <p>
              Current tenant Name: <b>{n?.tenant}</b>
            </p>
          </div>
          <br />
          <ViewButton n={n} navigate={navigate} />
        </div>
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
