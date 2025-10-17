import bcrypt from "bcryptjs";
// /api/admin
import { userValidation } from "../Validation/SchemaValidation.js"
import User from "../Models/UserSchema.js"
import Tenant from "../Models/TenantSchema.js"
import ExpressError from "../Middlewares/ExpressError.js"
import jwt from "jsonwebtoken";
export const registerUser = async (req, res, next) => {
    const { error, value } = userValidation.validate(req.body, { context: { isLogin: false } });
    console.log(error)
    if (error) return next(new ExpressError(400, "Please enter full details"));
    const { email, password, tenant, username, role } = value;
    // const existingUser = await User.findOne({ email, tenant });
    const findTenant = await Tenant.findOne({ name: tenant })
    if (!findTenant) return next(new ExpressError(403, "No existing Tenant found"))
    console.log("Found tenant SIGNUP B:", findTenant);
    const existingUser = await User.findOne({ email, tenant: findTenant._id })
    console.log("existing", existingUser)
    if (existingUser) return next(new ExpressError(402, "Already Registered"))
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hash", hashPassword)
    const user = await User.create({ email, password: hashPassword, tenant, username, role, password: hashPassword });
    res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        tenant: user.tenant
    })
}
//keep it tenant:user.tenant and not tenantId:user.tenant
const generateToken = (user) => jwt.sign({ _id: user._id, tenant: user.tenant, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" })
export const loginUser = async (req, res, next) => {
    console.log("login starts")
    const { email, password, tenant } = req.body;
    // const { error, value } = userValidation.validate(req.body, { context: { isLogin: true } })
    // console.log("login error: ", error)
    if (!email || !password || !tenant) return next(new ExpressError(400, "Wrong details. Please enter all"))
    const findTenant = await Tenant.findOne({ name: tenant })
    // console.log("tenant found: ", findTenant)
    if (!findTenant) return next(new ExpressError(403, "No tenant exist found"))
    // --- CHANGE STARTS HERE ---
    const user = await User.findOne({ email, tenant: findTenant._id }).populate('tenant'); // Populate the tenant field
    // --- CHANGE ENDS HERE ---
    // console.log("user found: ", user)
    if (!user) return next(new ExpressError(400, "Invalid credentials"));
    // const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // console.log("password matching", password, user.password)
    // if (!isPasswordCorrect) return next(new ExpressError(400, "Invalid credentials"));
    // Now user.tenant is the full tenant object, so user.tenant.name will work.
    if (user.tenant.name !== tenant) return next(new ExpressError(401, "Tenant not matched"))
    const token = generateToken(user)
    console.log("login done tenant ", tenant)

    res.cookie("tokenCookie", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    }).json({
        _id: user._id,
        email: user.email,
        role: user.role,
        tenant: user.tenant,
        token
    });
}
// export const loginUser = async (req, res, next) => {
//     console.log("login starts")
//     const { error, value } = userValidation.validate(req.body, { context: { isLogin: true } })
//     console.log("login error: ", error)
//     if (error) return next(new ExpressError(400, "Wrong details for login"))
//     const { email, password, tenant } = value;
//     console.log("got values: ", value)
//     const findTenant = await Tenant.findOne({ name: tenant })
//     console.log("tenant found: ", findTenant)
//     if (!findTenant) return next(new ExpressError(403, "No tenant exist found"))
//     const user = await User.findOne({ email, tenant: findTenant._id }).populate("tenant");
//     console.log("user found: ", user)///
//     if (!user) return next(new ExpressError(400, "Invalid credentials"));
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     console.log("password matching")
//     console.log("user tenant name", user.tenant.name, "tenant from login: ", tenant)
//     if (!isPasswordCorrect) return next(new ExpressError(400, "Invalid credentials"));
//     // if (user.tenant.name !== tenant) return next(new ExpressError(401, "Tenant not matched"))
//     console.log("login done")
//     res.json({
//         _id: user._id,
//         email: user.email,
//         role: user.role,
//         tenant: user.tenant,
//         token: generateToken(user)
//     });
// }
export const currentOwner = async (req, res, next) => {
    console.log("id of owner: ", req.user._id)
    const user = await User.findById(req.user._id).populate("tenant", "name");
    console.log("current owner NotesAuth: ", user.username)
    // console.log("req.user:", req.user);
    // console.log("current Admin AdminRoutes:", admin)
    if (!user) return next(new ExpressError(404, "User not found"));
    res.json(user);
}