import express from "express";
import { verifyToken } from "../Extra/middleware.js";
import User from "../NotesModels/UserSchema.js"
// /api/users
const route = express.Router();
//users current user
//first page of all notes
route.get("/", verifyToken, async (req, res) => {
    try {
        // console.log(req.user)
        // const userId = req.user
        const user = await User.findById(req.user.userId).populate("tenant", "name plan noteLimit");
        // console.log("current owner NotesAuth: ", user)
        // console.log("req.user:", req.user);
        if (!user) return res.status(404).json({ message: "User not found" });
        // console.log("view profile")
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})
//view profile with id
route.get("/:userid", verifyToken, async (req, res) => {
    try {
        // console.log(req.user)
        // const userId = req.user
        const user = await User.findById(req.user.userId).populate("tenant", "name plan noteLimit");
        // console.log("current owner NotesAuth: ", user)
        // console.log("req.user:", req.user);
        if (!user) return res.status(404).json({ message: "User not found" });
        // console.log("view profile with id")
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})
route.patch("/:id/edit", verifyToken, async (req, res) => {
    try {
        // console.log(req.user)
        // const userId = req.user
        const { username, password } = req.body;
        const newData = { username, password }
        const user = await User.findByIdAndUpdate(req.user.userId, newData, { new: true })
        // console.log("current owner NotesAuth: ", user)
        // console.log("req.user:", req.user);
        if (!user) return res.status(404).json({ message: "User not found" });
        console.log("new update", newData)
        console.log("updated User", user)
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})
export default route