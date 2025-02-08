import express from 'express';
import morgan from 'morgan';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to log requests
app.use(morgan('dev'));

// Using user and note routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes)

// Mongo URI for database connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
})