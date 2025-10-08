import express from "express";
// /api/notes/auth
import jwt from "jsonwebtoken"
const route = express.Router();
import User from "../NotesModels/UserSchema.js"
import Tenant from "../NotesModels/TenantSchema.js";
const key = "secretKey";
route.post("/signup", async (req, res, next) => {
    const { username, email, password, tenant, role } = req.body;
    if (!username || !email || !password || !tenant) return next(new ExpressError(401, "Please enter details"))
    const findTenant = await Tenant.findOne({ name: tenant })
    if (!findTenant) return next(new ExpressError(403, "No existing Tenant found"))
    console.log("Found tenant SIGNUP B:", findTenant);
    const existingUser = await User.findOne({ email, tenant: findTenant._id })
    if (existingUser) return next(new ExpressError(402, "Already Registered"))
    // const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password, role: role || "user", tenant: findTenant._id });
    //username, email, password, tenant id
    console.log("'new user NotesAuth SIGNUP B", user);
    res.json(user);
})
route.post("/login", async (req, res, next) => {
    const { email, password, tenant } = req.body;
    if (!email || !password || !tenant) return res.status(401).json("Please enter details");
    const findTenant = await Tenant.findOne({ name: tenant });
    // console.log("exisiting user:", findTenant)
    if (!findTenant) return next(new ExpressError(403, "No tenant exist found"))
    const user = await User.findOne({ email, tenant: findTenant._id }).populate("tenant", "name");
    if (!user) return next(new ExpressError(401, "First Register"))
    console.log("user found LOGIN B");
    const typePass = password;
    const savedPass = user.password;
    const isMatch = typePass === savedPass;
    if (!isMatch) return next(new ExpressError(402, "Wrong password"))
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(402).json("Wrong Password");
    // console.log("user for LOGIN: ", user)
    if (user.tenant.name !== tenant) {
        return next(new ExpressError(401, "Tenant mismatch – you don’t belong to this tenant"));
    }
    console.log("tenant to verify LOGIN: ", user.tenant.name)
    const token = jwt.sign({ userId: user._id, username: user.username, role: user.role.toLowerCase().trim(), tenant: user.tenant }, key, { expiresIn: "1h" });
    res.cookie("tokenCookie", token, { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 24 });
    console.log("token generated after login", token);
    res.json(token)
})
export default route;
