import express from "express";
// /api/notes
const route = express.Router();
import Notes from "../NotesModels/NotesSchema.js"
import { verifyToken, isNoteOwner, isRole, isPaid } from "../Extra/middleware.js"
import wrapAsync from "../Extra/WrapAsync.js";
import ExpressError from "../Extra/ExpressError.js"
route.post("/new", verifyToken, isRole("user", "admin"), isPaid, wrapAsync(async (req, res, next) => {
    const { title, content } = req.body;
    const existingNote = await Notes.findOne({ tenant: req.user.tenant._id, title });
    if (existingNote) return next(new ExpressError(401, "Note with title already exists"))
    const note = await Notes.create({ title, content, user: req.user.userId, tenant: req.user.tenant._id });
    console.log("new note NotesRoute B: ", note);
    res.json(note);

}))
route.get("/", verifyToken, isRole("user", "admin"), wrapAsync(async (req, res, next) => {
    // console.log("1. searching notes: ")
    //find notes
    const notes = await Notes.find({});
    if (!notes) return next(new ExpressError(401, "No notes to show"))
    // console.log("2. we will see all notes")
    //search - notes = title & content
    const search = req.query.search || "";
    const searchNotes = search ? notes.filter((n) => (n.title?.toLowerCase().includes(search?.toLowerCase()))) : notes;
    // console.log("3 See Searched Note: ", searchNotes)
    // console.log("3 See Searched Note: ", searchNotes)
    //sort
    const sortBy = req.query.sort || "title";
    console.log("2 value of sort: ", sortBy)
    const sortedNotes = [...searchNotes].sort((a, b) => {
        if (sortBy === "content") return a.content.localeCompare(b.content);
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0
    })
    const finalNotes = sortedNotes.length ? sortedNotes : notes
    // if (!sortedNotes.length) return res.json(searchNotes)
    // console.log("3 searching notes: ", finalNotes)
    // console.log("now sorted notes will send", finalNotes)
    res.json(finalNotes)
}))
route.get("/:notesId", verifyToken, isNoteOwner, isRole("user", "admin"), isNoteOwner, wrapAsync(async (req, res, next) => {

    const { notesId } = req.params;
    console.log("1. got id of one note B: ", notesId, req.user.userId, req.body)
    const notes = await Notes.findOne({ _id: notesId, tenant: req.user.tenant._id }).populate("tenant", "name").populate("user", "userId")
    if (!notes) return next(new ExpressError(401, "No single notes"))
    //title content user tenant
    // console.log("one note NotesRoute B", notes);
    //tenant from notes
    // console.log("one note note id tenant: ", notes.tenant._id) //
    //notes
    // console.log("one note note id: ", notes._id) //
    //tenant from user
    // console.log("getting tenant from user: ", req.user.tenant) //
    res.json(notes)

}))
// route.patch("/:notesId", verifyToken, isNoteOwner, isRole("user", "admin"), isNoteOwner, async (req, res) => {
//     try {
//         const { notesId } = req.params;
//         console.log("got id of one note B: ", notesId, req.user.userId)
//         const notes = await Notes.findOne({ _id: notesId, tenant: req.user.tenant._id }).populate("tenant", "name").populate("user", "userId")
//         if (!notes) return res.status(401).json("No Single Note");
//         //title content user tenant
//         // console.log("one note NotesRoute B", notes);
//         //tenant from notes
//         // console.log("one note note id tenant: ", notes.tenant._id) //
//         //notes
//         // console.log("one note note id: ", notes._id) //
//         //tenant from user
//         // console.log("getting tenant from user: ", req.user.tenant) //
//         res.json(notes)
//     } catch (e) {
//         res.status(401).json({ message: e })
//     }
// })
route.patch("/:notesId/edit", verifyToken, isRole("user", "admin"), wrapAsync(async (req, res, next) => {

    const id = req.params;
    const { title, content } = req.body;
    console.log("got body to edit: ", req.body);
    const newData = { title, content };
    // const notes = await Notes.findOne({id});
    const newNotes = await Notes.findByIdAndUpdate(id, newData);
    console.log("New Notes Updated: ", newNotes);
    res.json(newNotes);


}))
route.delete("/:notesId/delete", verifyToken, isRole("user", "admin"), wrapAsync(async (req, res, next) => {

    const { notesId } = req.params;
    console.log("id delete B: ", notesId)
    console.log("params delete B: ", req.params)
    const notes = await Notes.findOneAndDelete({ _id: notesId, tenant: req.user.tenant });
    // console.log("notes to delete B: ", notes)
    if (!notes) return next(new ExpressError(401, "No notes deleted"))
    // console.log("deleted", notes);
    res.json(notes);


}))
export default route;