import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const key = process.env.JWT_SECRET;
import Tenant from "./NotesModels/TenantSchema.js";
// "https://tenant-app-thle.vercel.app"
const FRONTEND_URL = process.env.FRONTEND_URL
app.use(cors({
    origin: [FRONTEND_URL || "http://localhost:5173"],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

async function mongooseConnect() {
    await mongoose.connect(`${MONGO_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("mongoose connected")
    // const tenant = await Tenant.create({
    //     name: "Globex",
    //     plan: "free",
    //     noteLimit: 3,
    //     paidUsers: 0
    // })
    // console.log("tenant creted", tenant);
}
mongooseConnect();
//auth
import NotesAuth from "./NotesAuth/NotesAuth.js";
app.use("/api/notes/auth", NotesAuth);
//notes admin + user
import NotesRoutes from "./NotesRoutes/NotesRoutes.js";
app.use("/api/notes", NotesRoutes);
//user Profile
import UserRoutes from "./NotesRoutes/UsersRoute.js";
app.use("/api/users", UserRoutes);
//admin   /api/admin
import AdminRoutes from "./NotesRoutes/AdminRoutes.js"
app.use("/api/admin", AdminRoutes)
//health
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
})
app.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})