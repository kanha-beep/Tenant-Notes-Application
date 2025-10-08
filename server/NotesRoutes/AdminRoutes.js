import express from "express";
// /api/admin
const route = express.Router();
import User from "../NotesModels/UserSchema.js"
// import Tenant from "../NotesModels/TenantSchema.js"
import Notes from "../NotesModels/NotesSchema.js"
import { verifyToken, isTenantAdmin, isRole } from "../Extra/middleware.js";
import Tenant from "../NotesModels/TenantSchema.js";
import wrapAsync from "../Extra/WrapAsync.js";
//admin
//api/admin/auth/me
route.get("/auth/me", verifyToken, wrapAsync(async (req, res, next) => {
    const admin = await User.findById(req.user.userId).populate("tenant", "name plan noteLimit");
    // console.log("current owner NotesAuth: ", user)
    // console.log("req.user:", req.user);
    // console.log("current Admin AdminRoutes:", admin)
    if (!admin) return next(new ExpressError(404, "User not found"));
    res.json(admin);
}))
//plan @@
route.get("/plan", verifyToken, isTenantAdmin, isRole(["admin"]), wrapAsync(async (req, res, next) => {

    // console.log("plan starts")
    const tenants = await Tenant.findById(req.user.tenant._id);
    if (!tenants) return next(new ExpressError(401, "No tenant adminROute"))
    const plan = tenants.plan;
    if (!plan) return next(new ExpressError(402, "No plan adminRoutes"))
    // console.log("tenant found AdminRoute: ", tenants)
    res.json(plan);

}))
//plan change
route.post("/plan", verifyToken, isTenantAdmin, isRole(["admin"]), wrapAsync(async (req, res, next) => {
    // console.log("tenant id: ", req.user.tenant._id);
    const { amount } = req.body;
    const amtValue = Number(amount)
    const tenants = await Tenant.findById(req.user.tenant._id);
    if (!tenants) return next(new ExpressError(401, "No tenant adminRoute"))
    const existingPlan = tenants.plan;
    console.log("existing plan", existingPlan);
    console.log('amount from body', typeof amount)//
    if (amtValue === 100) {
        tenants.plan = "paid";
        tenants.noteLimit = "unlimited";
        console.log("changed plan", tenants.plan, tenants.noteLimit)//
    } else if (amtValue <= 100) {
        tenants.plan = "free";
        tenants.noteLimit = "3";
        console.log("no change", tenants.plan, tenants.noteLimit)
    }
    tenants.save();
    console.log("tenant paid saved AdminRoute: ", tenants);
    res.json(tenants);
}))
//all users
route.get("/users", verifyToken, isTenantAdmin, isRole("admin"), wrapAsync(async (req, res, next) => {
    const searchUser = req.query.search || "";
    const sort = req.query.sort || "";
    console.log("1. sort: ", sort)
    const users = await User.find({ role: "user", tenant: req.user.tenant });
    if (!users) return next(new ExpressError(401, "No user AdminRoute"))
    const searchedUser = users.filter((u) => (u.username?.toLowerCase().includes(searchUser.toLowerCase())))
    // console.log("tenant found AdminRoute: ", searchedUser)
    const sortedUser = [...searchedUser].sort((a, b) => {
        // if (sort === "content" || "title") return a.username.localeCompare(b.username);
        // if (sort === "title") return a.title.localeCompare(b.title);
        if (sort === "username") return (a.username || "").toLowerCase().localeCompare(b.username.toLowerCase());
        if (sort === "email") return (a.email || "").toLowerCase().localeCompare(b.email.toLowerCase());
        return 0;
    })
    // console.log("now search user is being set", sortedUser)
    const finalSortedUser = sortedUser.length ? sortedUser : searchedUser;
    // console.log("now search user is being set", finalSortedUser)
    res.json(finalSortedUser);
}))
//new user
route.post("/users/new", verifyToken, isTenantAdmin, isRole(["admin"]), wrapAsync(async (req, res, next) => {

    console.log("getting user id new: ", req.params)
    const { username, password, email, title, content } = req.body;
    const tenant = await Tenant.findOne({ name: "Acme" });
    if (!tenant) return next(new ExpressError(402, "No tenant to save"))
    // console.log("tenant found new user", tenant)
    const users = await User.create({ username, email, password, title, content, role: "user", tenant: tenant._id });
    if (!users) return next(new ExpressError(401, "No user to create"))
    // console.log("user created AdminRoute: ", users)
    res.json(users);

}))
//single user
route.get("/users/:userId", verifyToken, isTenantAdmin, isRole(["admin"]), wrapAsync(async (req, res, next) => {

    // console.log("req.params single user AdminRoutes: ", req.params)
    const { userId } = req.params;
    const users = await User.findById(userId);
    if (!users) return next(new ExpressError(401, "No user adminRoute"))
    // console.log("user found AdminRoute: ", users)
    res.json(users);

}))
//users change
route.patch("/users/:userId/edit", verifyToken, isTenantAdmin, isRole(["admin"]), wrapAsync(async (req, res, next) => {

    console.log("req.params user Change AdminRoutes: ", req.params)
    const { userId } = req.params;
    console.log("req.body user change AdminRoutes: ", req.body);
    const { username } = req.body;
    const users = await User.findByIdAndUpdate(userId, { username });
    if (!users) return next(new ExpressError(401, "No user AdminRoute"))
    console.log("user changed AdminRoute: ", users)
    res.json(users);
    e
}))
//users delete
route.delete("/users/:userId", verifyToken, isTenantAdmin, isRole(["admin"]), wrapAsync(async (req, res, next) => {

    console.log("req.params delete AdminRoutes: ", req.params)
    const { userId } = req.params;
    console.log("got user id", userId)
    const users = await User.findByIdAndDelete(userId);
    if (!users) return next(new ExpressError(401, "No user AdminRoute"))
    console.log("user delete AdminRoute: ", users)
    res.json(users);

}))
//dashboard
route.get("/dashboard", verifyToken, isTenantAdmin, isRole(["admin"]), wrapAsync(async (req, res, next) => {

    const totalUsers = await User.countDocuments({ tenant: req.user.tenant, role: "user" });
    if (!totalUsers) return next(new ExpressError(401, "No dashboard"))
    const totalNotes = await Notes.countDocuments({ tenant: req.user.tenant });
    if (!totalUsers) return next(new ExpressError(402, "No user dashboard"))
    res.json({ totalUsers, totalNotes })

}))
export default route;