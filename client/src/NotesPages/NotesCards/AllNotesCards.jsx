import ViewButton from "../../Components/Buttons/ViewButton.jsx";
export default function AllUsersCards({
  n,
  navigate,
  userRole,
}) {
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  return (
    <div
      key={n?._id}
      style={{ backgroundColor: `${n?.check ? "lightgreen" : "red"}` }}
      className="ms-3 m-2 col-10 col-lg-10 col-md-10 rounded"
    >
      {/* admin + user */}
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
        // admin + notes template
        <div className="p-2">
          <p>
            Title: <b>{n?.title}</b>
          </p>
          <p>
            Owner Id: <b>{n?._id}</b>{" "}
          </p>
           <p>
            Tenant Id: <b>{n?.tenant._id}</b>
          </p>
          <p>
            Tenant Name: <b>{n?.tenant.name}</b>
          </p>
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
    //  {/* {userRole === "user" && (
    //     <>
    //       <p>
    //         Title: <b>{n.title} </b>
    //       </p>
    //       <p>
    //         {" "}
    //         Content: <b>{n.content} </b>
    //       </p>
    //       <p>
    //         Status: <b>{n?.check ? "Done" : "Pending"} </b>
    //       </p>
    //       <ViewButton n={n} navigate={navigate} />
    //     </>
    //   )} */}
  );
}
