import express from "express";
import { verifyToken } from "../Extra/middleware.js";
import User from "../NotesModels/UserSchema.js"
import wrapAsync from "../Extra/WrapAsync.js";
import ExpressError from "../Extra/ExpressError.js";
// /api/users
const route = express.Router();
//users current user
//first page of all notes
route.get("/", verifyToken, wrapAsync(async (req, res, next) => {
    // console.log("1.search user: ", req.query.search);
    // console.log(req.user)
    // const userId = req.user
    const user = await User.findById(req.user.userId).populate("tenant", "name plan noteLimit");
    // console.log("current owner NotesAuth: ", user)
    // console.log("req.user:", req.user);
    if (!user) return next(new ExpressError(404, "User not found"));

    // console.log("view profile")
    res.json(user);
}))
//view profile with id
route.get("/:userid", verifyToken, wrapAsync(async (req, res, next) => {

    // console.log(req.user)
    // const userId = req.user
    const user = await User.findById(req.user.userId).populate("tenant", "name plan noteLimit");
    // console.log("current owner NotesAuth: ", user)
    // console.log("req.user:", req.user);
    if (!user) return next(new ExpressError(404, "User not found"))
    // console.log("view profile with id")
    res.json(user);

}))
route.patch("/:id/edit", verifyToken, wrapAsync(async (req, res, next) => {

    // console.log(req.user)
    // const userId = req.user
    const { username, password } = req.body;
    const newData = { username, password }
    const user = await User.findByIdAndUpdate(req.user.userId, newData, { new: true })
    // console.log("current owner NotesAuth: ", user)
    // console.log("req.user:", req.user);
    if (!user) return next(new ExpressError(404, "User not found"))
    console.log("new update", newData)
    console.log("updated User", user)
    res.json(user);

}))
export default route