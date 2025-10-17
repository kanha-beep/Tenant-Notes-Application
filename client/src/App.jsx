import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
//notes
import AllNotesFinal from "./NotesPages/AllNotesFinal.jsx";
import NewNotes from "./NotesPages/NewNotes.jsx";
import EditNotes from "./NotesPages/EditNotes.jsx";
import SingleNotes from "./NotesPages/SingleNotes.jsx";
//auth
import Auth from "./Auth/Auth.jsx";
import Logout from "./Auth/Logout.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Health from "./AdminPages/Health.jsx";
import MyNavbar from "./Components/Navbar.jsx";
import Plan from "./AdminPages/Plan.jsx";
import api from "./init/instance.js";
import Home from "./Components/Home.jsx";
import Dashboard from "./AdminPages/Dashboard/Dashboard.jsx";
import Msg from "./Components/AlertBoxes/Msg.jsx";
//user
import EditUsersProfile from "./UsersPages/EditUsersProfile.jsx";
import CurrentOwnerProfile from "./UsersPages/CurrentOwnerProfile.jsx";
import AllUsersFinal from "./UsersPages/AllUsersFinal.jsx";
import SingleUsers from "./UsersPages/SingleUsers.jsx";
import EditUsers from "./UsersPages/EditUsers.jsx";
import NewUsers from "./UsersPages/NewUsers.jsx";

function App() {
  const [msg, setMsg] = useState("");
  const [isPage, setIsPage] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("tokens");
  // get current owner if token available
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        // ✅ Only run API call if token exists
        try {
          const res = await api.get("/auth/me"); // ✅ cookies auto included
          setIsLoggedIn(true); // ✅ mark user as logged in
          setIsPage(true);
          setUserRole(res.data.role); // ✅ set role from backend
        } catch (e) {
          setIsLoggedIn(false); // ❌ token invalid/expired
          setIsPage(false);
          setUserRole("");
          console.log("User not authenticated", e.response?.data?.message);
        }
      } else {
        setIsLoggedIn(false); // ✅ no token, clear states
        setIsPage(false);
        setUserRole("");
      }
    };
    validateToken();
  }, [token]);
  return (
    <div className="min-h-screen">
      <MyNavbar isLoggedIn={isLoggedIn} msg={msg} setMsg={setMsg} userRole={userRole}/>
      <Msg msg={msg} setMsg={setMsg} />
      <div className="container mx-auto px-4 py-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/health" element={<Health />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/users/:userId" element={<CurrentOwnerProfile />} />
          <Route path="/users/:userId/edit" element={<EditUsersProfile />} />
          //notes
          <Route
            path="/notes"
            element={<AllNotesFinal setIsPage={setIsPage} isPage={isPage} />}
          />
          <Route path="/notes/new" element={<NewNotes />} />
          <Route path="/notes/:noteId" element={<SingleNotes />} />
          <Route path="/notes/:noteId/edit" element={<EditNotes />} />
          //admin
          <Route path="/admin/users" element={<AllUsersFinal />} />
          <Route path="/admin/users/new" element={<NewUsers />} />
          <Route path="/admin/users/:userId" element={<SingleUsers />} />
          <Route path="/admin/users/:userId/edit" element={<EditUsers />} />
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
        <Route
          path="/auth"
          element={
            <Auth setIsLoggedIn={setIsLoggedIn} setMsg={setMsg} msg={msg} />
          }
        />
        <Route
          path="/logout"
          element={
            <Logout setIsLoggedIn={setIsLoggedIn} setIsPage={setIsPage} />
          }
        />
      </Routes>
      </div>
    </div>
  );
}

export default App;
