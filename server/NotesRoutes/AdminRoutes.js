import express from "express";
// /api/admin
const route = express.Router();
import User from "../NotesModels/UserSchema.js"
// import Tenant from "../NotesModels/TenantSchema.js"
import Notes from "../NotesModels/NotesSchema.js"
import { verifyToken, isTenantAdmin, isRole } from "../Extra/middleware.js";
import Tenant from "../NotesModels/TenantSchema.js";
//admin
//api/admin/auth/me
route.get("/auth/me", verifyToken, async (req, res) => {
    try {
        const admin = await User.findById(req.user.userId).populate("tenant", "name plan noteLimit");
        // console.log("current owner NotesAuth: ", user)
        // console.log("req.user:", req.user);
        // console.log("current Admin AdminRoutes:", admin)
        if (!admin) return res.status(404).json({ message: "User not found" });
        res.json(admin);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})
//plan @@
route.get("/plan", verifyToken, isTenantAdmin, isRole(["admin"]), async (req, res) => {
    try {
        // console.log("plan starts")
        const tenants = await Tenant.findById(req.user.tenant._id);
        if (!tenants) return res.status(401).json("No tenant AdminRoute")
        const plan = tenants.plan;
        if (!plan) return res.status(402).json("No plan AdminRoute");
        // console.log("tenant found AdminRoute: ", tenants)
        res.json(plan);
    } catch (e) {
        console.log("error AdminRoutes: ", e)
        res.status(401).json(e);
    }
})
//plan change
route.post("/plan", verifyToken, isTenantAdmin, isRole(["admin"]), async (req, res) => {
    // console.log("tenant id: ", req.user.tenant._id);
    const { amount } = req.body;
    const amtValue = Number(amount)
    const tenants = await Tenant.findById(req.user.tenant._id);
    if (!tenants) return res.status(401).json("No tenant AdminRoute");
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
})
//all users
route.get("/users", verifyToken, isTenantAdmin, isRole(["admin"]), async (req, res) => {
    try {
        const users = await User.find({ role: "user", tenant: req.user.tenant });
        if (!users) return res.status(401).json("No user AdminRoute");
        // console.log("tenant found AdminRoute: ", users)
        console.log("all users")
        res.json(users);
    } catch (e) {
        console.log("error users AdminRoutes: ", e)
        res.status(401).json(e);
    }
})
//new user
route.post("/users/new", verifyToken, isTenantAdmin, isRole(["admin"]), async (req, res) => {
    try {
        console.log("getting user id new: ", req.params)
        const { username, password, email } = req.body;
        const tenant = await Tenant.findOne({ name: "Acme" });
        if (!tenant) return res.status(402).json("No tenant to save AdminRoute");
        // console.log("tenant found new user", tenant)
        const users = await User.create({ username, email, password, role: "user", tenant: tenant._id });
        if (!users) return res.status(401).json("No user to create AdminRoute");
        // console.log("user created AdminRoute: ", users)
        res.json(users);
    } catch (e) {
        console.log("error new users AdminRoutes: ", e)
        res.status(401).json(e);
    }
})
//single user
route.get("/users/:userId", verifyToken, isTenantAdmin, isRole(["admin"]), async (req, res) => {
    try {
        // console.log("req.params single user AdminRoutes: ", req.params)
        const { userId } = req.params;
        const users = await User.findById(userId);
        if (!users) return res.status(401).json("No user AdminRoute");
        // console.log("user found AdminRoute: ", users)
        res.json(users);
    } catch (e) {
        console.log("error users AdminRoutes: ", e)
        res.status(401).json(e);
    }
})
//users change
route.post("/users/:userId/edit", verifyToken, isTenantAdmin, isRole(["admin"]), async (req, res) => {
    try {
        console.log("req.params user Change AdminRoutes: ", req.params)
        const { userId } = req.params;
        console.log("req.body user change AdminRoutes: ", req.body);
        const { username } = req.body;
        const users = await User.findByIdAndUpdate(userId, { username });
        if (!users) return res.status(401).json("No user AdminRoute");
        console.log("user changed AdminRoute: ", users)
        res.json(users);
    } catch (e) {
        console.log("error users AdminRoutes: ", e)
        res.status(401).json(e);
    }
})
//users delete
route.delete("/users/:userId", verifyToken, isTenantAdmin, isRole(["admin"]), async (req, res) => {
    try {
        console.log("req.params delete AdminRoutes: ", req.params)
        const { userId } = req.params;
        console.log("got user id", userId)
        const users = await User.findByIdAndDelete(userId);
        if (!users) return res.status(401).json("No user AdminRoute");
        console.log("user delete AdminRoute: ", users)
        res.json(users);
    } catch (e) {
        console.log("error users AdminRoutes: ", e)
        res.status(401).json(e);
    }
})
//dashboard
route.get("/dashboard", verifyToken, isTenantAdmin, isRole(["admin"]), async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ tenant: req.user.tenant, role: "user" });
        if (!totalUsers) return res.status(401).json("no dashboard");
        const totalNotes = await Notes.countDocuments({ tenant: req.user.tenant });
        if (!totalUsers) return res.status(402).json("no users Dashboard");
        res.json({ totalUsers, totalNotes })
    } catch (e) {
        console.log("error users AdminRoutes: ", e)
        res.status(401).json(e);
    }
})
export default route;