import {User} from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Get environment variables
dotenv.config();

// Logic for registering a new user
const registerUser = async (req, res) => {
    const username = req.body["username"];
    const password = req.body["password"];
    
    const newUser = await User.findOne(username);
    if (!newUser){
        res.status(400).json({message: "User already exists"});
    }

    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log("register new user controller");
};

const loginUser = async(req, res) => {
    const username = req.body["username"];
    const password = req.body["password"];
    console.log("in login user controller");
}

// Logic for logging in a user
//const loginUser = ();

export {registerUser, loginUser};