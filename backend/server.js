import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import connectDB from './db/db.js';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json());

app.use('/api/auth', authRoutes);

// app.get('/', (req, res) => {
//     res.send("Hello Kush");
// });

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`)
});