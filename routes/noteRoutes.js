import express from 'express';
const router = express.Router();
import {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
} from '../controllers/noteController.js';

// Route to create note
router.post('/', createNote);

// Route to get all notes
router.get('/', getNotes);

// Route to get a note by ID
router.get('/:id', getNoteById);

// Route to update a note by ID
router.put('/:id', updateNote);

// Route to delete a note by ID
router.delete('/:id', deleteNote);

export default router;