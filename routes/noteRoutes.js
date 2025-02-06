import express from 'express';
const router = express.Router();
import {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
} from '../controllers/noteController';