// /api/notes
import Notes from "../Models/NotesSchema.js"
import ExpressError from "../Middlewares/ExpressError.js"
export const newNote = async (req, res, next) => {
    const { title, content } = req.body;
    const existingNote = await Notes.findOne({ tenant: req.user.tenant._id, title });
    if (existingNote) return next(new ExpressError(401, "Note with title already exists"))
    const note = await Notes.create({ title, content, check: false, user: req.user._id, tenant: req.user.tenant._id });
    console.log("new note NotesRoute B: ", note);
    res.json(note);
}
export const allNotes = async (req, res, next) => {
    //find notes
    const notes = await Notes.find({}).populate("tenant");
    if (!notes) return next(new ExpressError(401, "No notes to show"))
    //pagination
    const search = req.query.search || "";
    const sortBy = req.query.sort || "title";
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const query = {};
    console.log(`user id ${req.user._id}`)
    if (search) query.title = { $regex: search, $options: "i" };
    // console.log("query search: ", query)
    const sortOptions = {};
    if (sortBy === "title") sortOptions.title = 1;
    if (sortBy === "content") sortOptions.content = 1;
    const finalPagination = await Notes.find({...query, tenant:req.user.tenant._id}).populate("tenant").sort(sortOptions).skip(skip).limit(limit);
    // console.log("final pagination: ", finalPagination)
    //search - notes = title & content
    // const searchNotes = search ? notes.filter((n) => (n.title?.toLowerCase().includes(search?.toLowerCase()))) : notes;
    // console.log("3 See Searched Note: ", searchNotes)
    // console.log("3 See Searched Note: ", searchNotes)
    //sort
    // console.log("2 value of sort: ", sortBy)
    // const sortedNotes = [...searchNotes].sort((a, b) => {
    //     if (sortBy === "content") return a.content.localeCompare(b.content);
    //     if (sortBy === "title") return a.title.localeCompare(b.title);
    //     return 0
    // })
    // const finalNotes = sortedNotes.length ? sortedNotes : notes
    // if (!sortedNotes.length) return res.json(searchNotes)
    // console.log("3 searching notes: ", finalNotes)
    // console.log("now sorted notes will send", finalNotes)
    const totalNotes = await Notes.countDocuments({...query, tenant: req.user.tenant._id});
    res.json({ page: page, totalPages: Math.ceil(totalNotes / limit), totalNotes: totalNotes, notes: finalPagination })
}

export const singleNote = async (req, res, next) => {
    const { noteId } = req.params;
    console.log("1. got id of one note B: ", noteId, req.user.userId, req.body)
    const notes = await Notes.findOne({ _id: noteId, tenant: req.user.tenant._id }).populate("tenant", "name").populate("user", "userId")
    if (!notes) return next(new ExpressError(401, "No single notes"))
    //title content user tenant
    console.log("one note NotesRoute B", notes);
    //tenant from notes
    // console.log("one note note id tenant: ", notes.tenant._id) //
    //notes
    // console.log("one note note id: ", notes._id) //
    //tenant from user
    // console.log("getting tenant from user: ", req.user.tenant) //
    res.json(notes)
}
//update check
export const updateCheck = async (req, res, next) => {
    try {
        // console.log("check starts")
        const { noteId } = req.params;
        // console.log("got id of one note B for update: ", notesId, req.user.userId)
        const notes = await Notes.findOne({ _id: noteId, tenant: req.user.tenant._id }).populate("tenant", "name").populate("user", "userId")
        if (!notes) return next(ExpressError(401, "No single note found"));
        const check = req.body.check;
        // console.log("check value got: : ", notes.check);
        const newNotes = await Notes.findByIdAndUpdate({ _id: noteId }, { check: check }, { new: true })
        // console.log("new notes to update: ", newNotes);
        //title content user tenant
        // console.log("one note NotesRoute B", notes);
        //tenant from notes
        // console.log("one note note id tenant: ", notes.tenant._id) //
        //notes
        // console.log("one note note id: ", notes._id) //
        //tenant from user
        // console.log("getting tenant from user: ", req.user.tenant) //
        res.json(newNotes)
    } catch (e) {
        res.status(401).json({ message: e })
    }
}
//edit task
export const singleNoteToEdit = async (req, res, next) => {
    const { noteId } = req.params;
    const notes = await Notes.findOne({ _id: noteId, tenant: req.user.tenant._id });
    if (!notes) return next(new ExpressError(404, "Note not found"));
    res.json(notes);
}
export const editNote = async (req, res, next) => {
    const { noteId } = req.params;
    const { title, content } = req.body;
    const newData = { title, content };
    const newNotes = await Notes.findOneAndUpdate(
        { _id: noteId, tenant: req.user.tenant._id }, 
        newData, 
        { new: true }
    );
    if (!newNotes) return next(new ExpressError(404, "Note not found or unauthorized"));
    console.log("New Notes Updated: ", newNotes);
    res.json(newNotes);
}
export const deleteNote = async (req, res, next) => {
    const { noteId } = req.params;
    console.log("id delete B: ", noteId)
    console.log("params delete B: ", req.params)
    const notes = await Notes.findOneAndDelete({ _id: noteId, tenant: req.user.tenant });
    // console.log("notes to delete B: ", notes)
    if (!notes) return next(new ExpressError(401, "No notes deleted"))
    // console.log("deleted", notes);
    res.json(notes);
}