import ViewButton from "../../Components/Buttons/ViewButton.jsx";
export default function AllUsersCards({ n, navigate, userRole }) {
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  return (
    <div
      key={n?._id}
      style={{ backgroundColor: `${n?.check ? "lightgreen" : "red"}` }}
      className="ms-3 m-2 col-11 col-lg-5 col-md-5 rounded"
    >
      {/* admin + users */}
      {userRole === "admin" && toShowAdmin === "users" && (
        <div className="p-2">
            <p>
              UserName: <b>{n?.username}</b>
            </p>
            <p>
              Email: <b>{n?.email}</b>
            </p>
            <p>
              Owner Id: <b>{n?._id}</b>{" "}
            </p>
            <p>
              Tenant Name: <b>{n?.tenant}</b>
            </p>
          <ViewButton n={n} navigate={navigate} />
        </div>
      )}
    </div>
  );
}
