import express from 'express';
import auth from '../middleware/auth.js';
const router = express.Router();
import {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
} from '../controllers/noteController.js';

// Route to create note
router.post('/', auth, createNote);

// Route to get all notes
router.get('/', auth, getNotes);

// Route to get a note by ID
router.get('/:id', auth, getNoteById);

// Route to update a note by ID
router.put('/:id', auth, updateNote);

// Route to delete a note by ID
router.delete('/:id', auth, deleteNote);

export default router;