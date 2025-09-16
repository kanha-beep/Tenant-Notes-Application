import express from "express";
// /api/notes
const route = express.Router();
import User from "../NotesModels/UserSchema.js"
// import Tenant from "../NotesModels/TenantSchema.js"
import Notes from "../NotesModels/NotesSchema.js"
import { verifyToken, isNoteOwner, isRole, isPaid } from "../Extra/middleware.js"
route.post("/new", verifyToken, isRole("user", "admin"), isPaid, async (req, res) => {
    try {
        const { title, content } = req.body;
        // console.log("getting tenant form user in new: ", req.user.tenant); //
        const existingNote = await Notes.findOne({ tenant: req.user.tenant._id, title });
        if (existingNote) return res.status(401).json("Note with this title already exists")
        const note = await Notes.create({ title, content, user: req.user.userId, tenant: req.user.tenant._id });
        //title content user
        console.log("new note NotesRoute B: ", note);
        //user passwordG
        // console.log("new note user B:", req.user)
        res.json(note);
    } catch (e) {
        res.status(401).json({ message: e })
        console.log("Error in NotesRoute B new Note")
    }
})
route.get("/", verifyToken, isRole("user", "admin"), async (req, res) => {
    try {
        // console.log("req.user in route:", req.user);
        const notes = await Notes.find({}).populate("user", "userId").populate("tenant", "name");
        if (!notes) return res.status(401).json("No Notes to show B");
        console.log("user role NotesRoutes: ,", "role", req.user.role)
        // console.log("all notes: ", notes)//
        res.json(notes)
    } catch (e) {
        res.status(401).json({ message: e })
    }
})
route.get("/:notesId", verifyToken, isRole("user", "admin"), isNoteOwner, async (req, res) => {
    try {
        const { notesId } = req.params;
        console.log("got id of one note B: ", notesId, req.user.userId)
        const notes = await Notes.findOne({ _id: notesId, tenant: req.user.tenant._id }).populate("tenant", "name").populate("user", "userId")
        if (!notes) return res.status(401).json("No Single Note");
        //title content user tenant
        // console.log("one note NotesRoute B", notes);
        //tenant from notes
        // console.log("one note note id tenant: ", notes.tenant._id) //
        //notes
        // console.log("one note note id: ", notes._id) //
        //tenant from user
        // console.log("getting tenant from user: ", req.user.tenant) //
        res.json(notes)
    } catch (e) {
        res.status(401).json({ message: e })
    }
})
route.patch("/:notesId/edit", verifyToken, isRole("user", "admin"), async (req, res) => {
    try {
        const id = req.params;
        const { title, content } = req.body;
        console.log("got body to edit: ", req.body);
        const newData = { title, content };
        // const notes = await Notes.findOne({id});
        const newNotes = await Notes.findByIdAndUpdate(id, newData);
        console.log("New Notes Updated: ", newNotes);
        res.json(newNotes);
    } catch (e) {
        res.status(401).json({ message: e })
    }

})
route.delete("/:notesId/delete", verifyToken, isRole("user", "admin"), async (req, res) => {
    try {
        const { notesId } = req.params;
        console.log("id delete B: ", notesId)
        console.log("params delete B: ", req.params)
        const notes = await Notes.findOneAndDelete({ _id: notesId, tenant: req.user.tenant });
        // console.log("notes to delete B: ", notes)
        if (!notes) return res.status(401).json("No note Delete B")
        // console.log("deleted", notes);
        res.json(notes);
    } catch (e) {
        res.status(401).json({ message: e })
    }

})
export default route;