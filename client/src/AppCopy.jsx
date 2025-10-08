// import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Navigate, Route, Routes } from "react-router-dom";
import AllNotes from "./NotesPages/AllNotes.jsx";
import NewNotes from "./NotesPages/NewNotes.jsx";
import Notes from "./NotesPages/Notes.jsx";
import EditNotes from "./NotesPages/EditNotes.jsx";
import MyNavbar from "./NotesComponents/Navbar.jsx";
import Auth from "./NotesAuth/Auth.jsx";
import Logout from "./NotesAuth/Logout.jsx";
import ProtectedRoute from "./NotesPages/ProtectedRoute.jsx";
// import AllUsers from "./NotesAdminPages/AllUsers.jsx";
//users by admin
// import NewUsers from "./NotesAdminPages/NewUsers.jsx";
import C3_EditUsers from "./NotesAdminPages/AllUsers/C3_EditUsers.jsx";
import Dashboard from "./NotesAdminPages/Dashboard.jsx";
import Plan from "./NotesAdminPages/Plan.jsx";
import Health from "./NotesAdminPages/Health.jsx";
import { useState } from "react";
import { useEffect } from "react";
import api from "./init/api.js";
import Users from "./NotesUsersPages/Users.jsx";
import EditUsersProfile from "./NotesUsersPages/EditUsersProfile.jsx";
import AllUsersFinal from "./NotesAdminPages/AllUsers/AllUsersFinal.jsx";
import C4_SingleUsers from "./NotesAdminPages/AllUsers/C4_SingleUsers.jsx";
import C2_NewUsers from "./NotesAdminPages/AllUsers/C2_NewUsers.jsx";
import AllNotesFinal from "./NotesPages/AllNotesFinal.jsx";

function AppCopy() {
  // const {userId} = useParams();
  const [isPage, setIsPage] = useState(true);
  // const url = isPage ? "login":"signup"
  // const [url, setUrl] = useState("login")
  const [userRole, setUserRole] = useState(""); // "admin" or "user"
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("tokens");
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsLoggedIn(false);
        setIsPage(false);
        setUserRole("");
        return;
      }
      try {
        await api.get(`/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLoggedIn(true);
        setIsPage(true);
        // console.log("Online if no token APp.jsx");
        // console.log("token saved", token);
        const role = localStorage.getItem("role"); //admin
        setUserRole(role);
        // console.log("1. userRole:", role); //admin
        // console.log("3. userRole:", userRole); //empty
      } catch {
        localStorage.removeItem("tokens");
        setIsLoggedIn(false);
        setIsPage(false);
        setUserRole("");
        console.log("2. userRole:", userRole);
        console.log("offline if no token APp.jsx");
      }
    };
    validateToken();
  }, [token]);
  return (
    <>
      <MyNavbar isLoggedIn={isLoggedIn} />
      <Routes>
        {/* <Route path="/" element={<AllUsers />} /> */}
        <Route path="/health" element={<Health />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/users/:usersId" element={<Users />} />
          <Route path="/users/:usersId/edit" element={<EditUsersProfile />} />
          <Route path="/" element={<AllNotes />} />
          //notes
          <Route
            path="/notes"
            element={<AllNotesFinal setIsPage={setIsPage} isPage={isPage} />}
          />
          <Route path="/notes/new" element={<NewNotes />} />
          <Route path="/notes/:notesId" element={<C4_SingleUsers />} />
          <Route path="/notes/:notesId/edit" element={<EditNotes />} />
          //admin
          <Route path="/admin/users" element={<AllUsersFinal />} />
          <Route path="/admin/users/new" element={<C2_NewUsers />} />
          <Route path="/admin/users/:userId" element={<C4_SingleUsers />} />
          <Route path="/admin/users/:userId/edit" element={<C3_EditUsers />} />
          {/* <Route path="/admin/users/:userId" element={<AllUsers />} /> */}
          <Route
            path="/admin/dashboard"
            element={
              userRole === "" ? (
                <div>Loading...</div>
              ) : userRole === "admin" ? (
                <Dashboard isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to="/notes" />
              )
            }
          />
          <Route path="/admin/plan" element={<Plan />} />
        </Route>
        <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/logout"
          element={
            <Logout setIsLoggedIn={setIsLoggedIn} setIsPage={setIsPage} />
          }
        />
      </Routes>
    </>
  );
}

export default AppCopy;
