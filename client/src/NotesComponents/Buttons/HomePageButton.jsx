export default function HomePageButton({ navigate, userRole, toShowAdmin }) {
  console.log("now amdin will see: ", userRole, toShowAdmin);
  return (
    <div>
      {userRole === "user" ? (
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            navigate(`/notes`);
          }}
        >
          Home Page
        </button>
      ) : toShowAdmin === "users" ? (
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            navigate(`/admin/users`);
          }}
        >
          Home Page
        </button>
      ) : (
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            navigate(`/notes`);
          }}
        >
          Home Page
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
