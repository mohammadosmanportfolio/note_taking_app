import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token){
        console.log("No token provided");
        return res.status(401).json({message: 'No token, authorization denied'});
    }

    try {
        console.log(`Current token: ${token}`);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.user){
            console.log("Decoded token does not contain anything");
            return res.status(401).json({message: 'Token is not valid'});
        }

        req.user = decoded.user;
        next();
    }catch(error){
        console.log("Token verification failed");
        res.status(401).json({message: 'Token is not valid'});
    }
};

export default auth;