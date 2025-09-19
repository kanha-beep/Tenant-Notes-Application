// import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Navigate, Route, Routes } from "react-router-dom";
import AllNotes from "./NotesPages/AllNotes.jsx";
import NewNotes from "./NotesPages/NewNotes.jsx";
import Notes from "./NotesPages/Notes.jsx";
import EditNotes from "./NotesPages/EditNotes.jsx";
import Navbar from "./NotesComponents/Navbar.jsx";
import Auth from "./NotesAuth/Auth.jsx";
import Logout from "./NotesAuth/Logout.jsx";
import ProtectedRoute from "./NotesPages/ProtectedRoute.jsx";
import AllUsers from "./NotesAdminPages/AllUsers.jsx";
import NewUsers from "./NotesAdminPages/NewUsers.jsx";
import User from "./NotesAdminPages/Users.jsx";
import EditUsers from "./NotesAdminPages/EditUsers.jsx";
import Dashboard from "./NotesAdminPages/Dashboard.jsx";
import Plan from "./NotesAdminPages/Plan.jsx";
import Health from "./NotesAdminPages/Health.jsx";
import { useState } from "react";
import { useEffect } from "react";
import api from "./init/api.js";

function App() {
  const [isPage, setIsPage] = useState(true);
  // const url = isPage ? "login":"signup"
  // const [url, setUrl] = useState("login")
  const [userRole] = useState(""); // "admin" or "user"
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("tokens");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
      try {
        await api.get("/api/notes/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLoggedIn(true);
        setIsPage(true)
      } catch {
        localStorage.removeItem("tokens");
        setIsLoggedIn(false);
        setIsPage(false)
      }
    };
    validateToken();
  }, []);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        {/* <Route path="/" element={<AllUsers />} /> */}
        <Route path="/health" element={<Health />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AllNotes />} />
          <Route path="/notes" element={<AllNotes />} />
          <Route path="/notes/new" element={<NewNotes />} />
          <Route path="/notes/:notesId" element={<Notes />} />
          <Route path="/notes/:notesId/edit" element={<EditNotes />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/users/new" element={<NewUsers />} />
          <Route path="/admin/users/:userId" element={<User />} />
          <Route path="/admin/users/:userId/edit" element={<EditUsers />} />
          <Route path="/admin/users/:userId" element={<AllUsers />} />
          <Route
            path="/admin/dashboard"
            element={
              userRole === "admin" ? (
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
          element={<Logout setIsLoggedIn={setIsLoggedIn}/>}
        />
      </Routes>
    </>
  );
}

export default App;
