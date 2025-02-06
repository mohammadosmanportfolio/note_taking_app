import express from 'express';
const router = express.Router();
import {registerUser, loginUser} from '../controllers/userController'

// Route to create a user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

export default router;