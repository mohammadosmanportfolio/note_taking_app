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
    console.log(`Registering user ${username}`);
    
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
    console.log(`New user saved: ${newUser}`);

    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log("register new user controller");
    res.status(201).json({message: `User with name ${username} created`});
    }catch(error){
        console.log("Got en error trying to register a user");
        console.log(error.message);
        res.status(500).send("server error");
    }
};

const loginUser = async(req, res) => {
    const username = req.body["username"];
    const password = req.body["password"];
    console.log("in login user controller");

    try{
    // Checking if the user doesn't exist
    const existingUser = await User.findOne(username);
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
        {userId: existingUser._id},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );

    // User has successfully logged in at this point
    console.log(`User has successfully logged in ${username}`);
    res.status(200).json({token})
    }catch(error){
        console.log(`Error logging in user: ${error}`);
        res.status(500).json({message: "Server error"});
    }
};

// Logic for logging in a user
//const loginUser = ();

export {registerUser, loginUser};