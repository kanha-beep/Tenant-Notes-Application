const key = "secretKey";
import jwt from "jsonwebtoken"
import Notes from "../NotesModels/NotesSchema.js"
import Tenant from "../NotesModels/TenantSchema.js";
const verifyToken = async (req, res, next) => {
    const token = req.cookies.tokenCookie;
    // const auth = req.headers["authorization"]
    // const token = auth && auth.split(" ")[1]
    if (!token) return res.status(401).json("No token provided");
    jwt.verify(token, key, (error, user) => {
        if (error) return res.status(401).json("Not Logged In Middleware");
        req.user = user;
        //user, password, tenant
        // console.log("user verified and saved verifyToken B: ", req.user);
        next();
    })
}
const isNoteOwner = async (req, res, next) => {
    try {
        console.log(req.params)
        const tenant = req.user.tenant;
        const notes = await Notes.findOne({ _id: req.params.notesId, tenant: tenant._id }).populate("tenant").populate("user")
        if (!notes) return res.status(404).json({ message: "Not an owner" });
        if (tenant._id.toString() !== notes.tenant._id.toString()) return res.status(403).json({ message: "Unauthorized: different tenant" });
        if (req.user.userId.toString() !== notes.user._id.toString()) return res.status(403).json({ message: "Unauthorized: not the owner" });
        console.log("user isTenant: ", req.user.userId, req.user.tenant.name);
        next();
    } catch (e) {
        console.log("Error in isNotesOwner middleware:", e);
        res.status(500).json({ message: "Server error in verifying note owner" });
    }
}
const isRole = (...roles) => {
    return function (req, res, next) {
        const userRole = req.user.role.toString().toLowerCase().trim();
        // console.log(" user role MW:", userRole)
        const allowedRoles = roles.map(r => r.toString().toLowerCase().trim());
        // console.log(" allowed role MW:", allowedRoles)
        // console.log("user role isRole MW:", userRole);
        if (!allowedRoles.includes(userRole)) return res.status(403).json({ message: "Forbidden: No role", user: "user", admin: "admin" });
        // console.log("roles checked isRole MW");
        next();
    }
}
const isTenantAdmin = async (req, res, next) => {
    try {
        // console.log("tenant id MW: ", req.user.tenant._id)
        const tenantId = req.user.tenant._id; // from JWT
        if (!tenantId) return res.status(403).json({ message: "No tenant found in token" });
        // ensure the tenant exists
        const tenant = await Tenant.findById(tenantId);
        if (!tenant) return res.status(404).json({ message: "Tenant not found" });
        // attach tenant for next steps
        req.tenant = tenant;
        next();
    } catch (err) {
        console.error("Error in isTenantAdmin middleware:", err);
        res.status(500).json({ message: "Server error in verifying admin" });
    }
};
const isPaid = async (req, res, next) => {
    try {
        // console.log("tenant id MW: ", req.user.tenant._id)
        const tenantId = req.user.tenant._id; // from JWT
        if (!tenantId) return res.status(403).json({ message: "No tenant found in token" });
        // ensure the tenant exists
        const tenant = await Tenant.findById(tenantId);
        if (!tenant) return res.status(404).json({ message: "Tenant not found" });
        console.log("tenant found:", tenant);
        //unlimited
        const noteLimit = tenant.noteLimit;
        console.log("note limit:", noteLimit);
        if (noteLimit === "unlimited") {
            return next();
        }
        //for free
        const limit = Number(tenant.noteLimit);
        console.log("note limit number", limit);
        const noteCount = await Notes.countDocuments({ tenant: tenantId });
        if (limit <= noteCount) return res.status(403).json(`Free Plan Limit ended. Upgrade to Pro`);
        next();
    } catch (err) {
        console.error("Error in isTenantAdmin middleware:", err);
        res.status(500).json({ message: "Server error in verifying amount paid" });
    }
};
export { verifyToken, isNoteOwner, isRole, isTenantAdmin, isPaid }