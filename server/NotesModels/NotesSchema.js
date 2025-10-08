import mongoose from "mongoose";
const notesSchema = new mongoose.Schema({
    title: String,
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant"
    },
    // check: false,
})
const Note = mongoose.model("Note", notesSchema);
export default Note