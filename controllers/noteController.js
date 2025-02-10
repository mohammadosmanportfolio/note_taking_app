import Note from '../models/Note.js'

const createNote = async (req, res) => {
    const title = req.body['title'];
    const content = req.body['content'];
    const userId = req.user?.id;

    try {
        const newNote = new Note({
            user: userId,
            title: title,
            content: content
        });
        await newNote.save();
        res.status(201).json(newNote);
    }catch(error){
    console.error(error.message);
    console.error(error.stack);
    res.status(500).send("Sever error");
    }
};

const getNotes = async (req, res) => {
    const userId = req.user.id;

    try {
        const notes = await Note.find({user: userId});
        res.status(200).json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    }
}

const getNoteById = async (req, res) => {
    const userId = req.user.id;
    const noteId = req.params.id;

    try {
        const note = await Note.findOne({_id: noteId, user: userId});
        if (!note){
            return res.status(404).json({message: 'Note not found'});
        }
        res.status(200).json(note);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    }
};

const updateNote = async (req, res) => {
    const userId = req.user.id;
    const noteId = req.params.id;
    const title = req.body['title'];
    const content = req.body['content'];

    try {
        const note = await Note.findOneAndUpdate({_id: noteId, user:userId},
            {
                title: title, 
                content: content
            },
            {new: true}
        );

        if (!note){
            return res.status(404).json({message: 'Note not found'});
        }

        res.status(200).json(note);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    }
}

const deleteNote = async (req, res) => {
    const userId = req.user.id;
    const noteId = req.params.id;

    try {
        const note = await Note.findOneAndDelete({
            _id: noteId,
            user: userId
        });

        if (!note){
            return res.status(404).json({message: "Could not find note"});
        }
        res.status(200).json({message: "Note deleted"});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    }
};

export {createNote, getNotes, getNoteById, updateNote, deleteNote};