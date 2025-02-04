import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to log requests
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send("Hello World new");
});

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
})