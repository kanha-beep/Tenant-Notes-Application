export default function HomePageButton({ navigate, userRole, toShowAdmin }) {
  console.log("now amdin will see: ", userRole, toShowAdmin);
  return (
    <div>
      {userRole === "user" ? (
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            navigate(`/notes`, {state: "notes"});
          }}
        >
          Home Page For User
        </button>
      ) : toShowAdmin === "users" ? (
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            navigate(`/admin/users`, {state: "users"});
          }}
        >
          Home Page for Admin + users
        </button>
      ) : (
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            navigate(`/notes`, {state: "notes"});
          }}
        >
          Home Page for admin + notes
        </button>
      )}
      {/* <button
        className="btn btn-outline-primary"
        onClick={() => {
          if (userRole === "admin") navigate(`/admin/users`);
          else navigate(`/notes`);
        }}
      >
        Home Page
      </button> */}
    </div>
  );
}
