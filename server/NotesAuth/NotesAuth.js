import express from "express";
// /api/notes/auth
import jwt from "jsonwebtoken"
const route = express.Router();
// import bcrypt from 'bcrypt';
import User from "../NotesModels/UserSchema.js"
import Tenant from "../NotesModels/TenantSchema.js";
import { verifyToken } from "../Extra/middleware.js";
const key = "secretKey";
route.post("/signup", async (req, res) => {
    const { username, email, password, tenant, role } = req.body;
    if (!username || !email || !password || !tenant) return res.status(401).json("Please enter details");
    const findTenant = await Tenant.findOne({ name: tenant })
    if (!findTenant) return res.status(403).json("No existing Tenant found")
    console.log("Found tenant SIGNUP B:", findTenant);
    const existingUser = await User.findOne({ email, tenant: findTenant._id })
    if (existingUser) return res.status(402).json("Already Registered");
    // const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password, role: role || "user", tenant: findTenant._id });
    //username, email, password, tenant id
    console.log("'new user NotesAuth SIGNUP B", user);
    res.json(user);
})
route.post("/login", async (req, res) => {
    const { email, password, tenant } = req.body;
    if (!email || !password || !tenant) return res.status(401).json("Please enter details");
    const findTenant = await Tenant.findOne({ name: tenant });
    // console.log("exisiting user:", findTenant)
    if (!findTenant) return res.status(403).json("No Tenant exist B")
    const user = await User.findOne({ email, tenant: findTenant._id }).populate("tenant", "name");
    if (!user) return res.status(401).json("First Register");
    console.log("user found LOGIN B");
    const typePass = password;
    const savedPass = user.password;
    const isMatch = typePass === savedPass;
    if (!isMatch) return res.status(402).json("Wrong Password");
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(402).json("Wrong Password");
    // console.log("user for LOGIN: ", user)
    if (user.tenant.name !== tenant) {
        return res.status(403).json("Tenant mismatch – you don’t belong to this tenant");
    }
    console.log("tenant to verify LOGIN: ", user.tenant.name)
    const token = jwt.sign({ userId: user._id, username: user.username, role: user.role.toLowerCase().trim(), tenant: user.tenant }, key, { expiresIn: "1h" });
    // console.log("token generated after login", token);
    res.json(token)
})
//users current user
route.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate("tenant", "name plan noteLimit");
        // console.log("current owner NotesAuth: ", user)
        // console.log("req.user:", req.user);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})
export default route;
