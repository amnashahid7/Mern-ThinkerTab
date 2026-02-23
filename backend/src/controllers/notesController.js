import Note from "../models/Note.js";

export  async function getAllNotes(_,res){
    try {
        const notes= await Note.find().sort({createdAt: -1}); // find() method is used to retrieve all the documents from the notes collection in the database. It returns an array of notes.
        res.status(200).json(notes); // Send the retrieved notes as a JSON response with a status code of 200 (OK).
    } catch (error) {
        console.error("Error fetching notes:", error); // Log the error to the console for debugging purposes.
        res.status(500).json({message:"Failed to fetch notes", error: error.message}); // If there is an error while fetching the notes, send a JSON response with a status code of 500 (Internal Server Error) and include the error message in the response.
    }

}

export async function createNote(req,res){
    try {
        const {title,content}= req.body;
        const newNote= new Note({title,content}); // Create a new instance of the Note model using the title and content from the request body.
        await newNote.save(); // Save the new note to the database.
        res.status(201).json({message:"Note created successfully!", note: newNote}); // Send the newly created note as a JSON response with a status code of 201 (Created).
    } catch (error) {
        console.error("Error creating note:", error); // Log the error to the console for debugging purposes.
        res.status(500).json({message:"Failed to create note", error: error.message}); // If there is an error while creating the note, send a JSON response with a status code of 500 (Internal Server Error) and include the error message in the response.
    }
}

export const updateNote=async (req,res)=>{
    try {
        const {title, content}= req.body;
    const updatedNote= await Note.findByIdAndUpdate(req.params.id,{title, content}, {new: true}); // findByIdAndUpdate() method is used to find a note by its ID and update its title and content with the new values provided in the request body. The ID of the note to be updated is expected to be passed as a URL parameter (req.params.id).
    if(!updatedNote){
        return res.status(404).json({message:"Note not found!"}); // If no note is found with the provided ID, send a JSON response with a status code of 404 (Not Found) and a message indicating that the note was not found.
    }
    res.status(200).json({message:"Note updated successfully!", note: updatedNote}); // Send a JSON response with a status code of 200 (OK) indicating that the note was updated successfully.

    } catch (error) {
        console.error("Error updating note:", error); // Log the error to the console for debugging purposes.
        res.status(500).json({message:"Failed to update note", error: error.message}); // If there is an error while updating the note, send a JSON response with a status code of 500 (Internal Server Error) and include the error message in the response.
    }}

export const deleteNote=async (req,res)=>{
    try {
        const deletedNote= await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({message:"Note not found!"});
        }
        res.status(200).json({message:"Note deleted successfully!", note: deletedNote});
    } catch (error) {
        console.error("Error deleting note:", error); // Log the error to the console for debugging purposes.
        res.status(500).json({message:"Failed to delete note", error: error.message}); // If there is an error while deleting the note, send a JSON response with a status code of 500 (Internal Server Error) and include the error message in the response.
    }
}


export const getNoteById= async(req,res)=>{
    try {
        const note= await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note not found!"});
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note by ID:", error); // Log the error to the console for debugging purposes.
        res.status(500).json({message:"Failed to fetch note", error: error.message}); // If there is an error while fetching the note, send a JSON response with a status code of 500 (Internal Server Error) and include the error message in the response.
    }
}