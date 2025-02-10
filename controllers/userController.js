import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Get environment variables
dotenv.config();

// Logic for registering a new user
const registerUser = async (req, res) => {
    const username = req.body["username"];
    const password = req.body["password"];
    
    try {
    const existingUser = await User.findOne({username});
    if (existingUser){
       return res.status(400).json({message: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username: username,
        password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign(
        {user: {id: newUser._id} },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );

    res.status(201).json({token});
    }catch(error){
        console.log(error.message);
        res.status(500).send("server error");
    }
};

const loginUser = async(req, res) => {
    const username = req.body["username"];
    const password = req.body["password"];

    try{
    // Checking if the user doesn't exist
    const existingUser = await User.findOne({username});
    if(!existingUser){
        console.log(`Invalid credentials ${username}`);
        return res.status(400).json({message: "Invalid credentials"});
    }

    // Checking if the password the user entered is correct
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch){
        console.log(`Invalid credentials ${username}`);
        return res.status(400).json({message: "Invalid credentials"});
    }

    const token = jwt.sign(
        {user: {id: existingUser._id}},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );

    // User has successfully logged in at this point
    res.status(200).json({token})
    }catch(error){
        console.log(`Error logging in user: ${error}`);
        res.status(500).json({message: "Server error"});
    }
};

export {registerUser, loginUser};