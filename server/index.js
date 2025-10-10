import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ExpressError from "./Extra/ExpressError.js";
dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const key = process.env.JWT_SECRET;
import Tenant from "./NotesModels/TenantSchema.js";
// "https://tenant-app-thle.vercel.app"
const FRONTEND_URL = process.env.FRONTEND_URL
// app.use(cors({
//     origin: FRONTEND_URL || "http://localhost:5173" || "http://192.168.0.101:5173",
//     credentials: true
// }))
app.use(cors({
  origin: ["http://localhost:5173", FRONTEND_URL], // whitelist both
  credentials: true
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser()); // MUST be before your routes/middleware


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
app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});
app.use((error, req, res, next) => {
    const { message, status=404} = error;
    res.status(status).json(message)
})
app.listen(PORT, "0.0.0.0", () => {
    console.log(`listening port ${PORT}`)
})