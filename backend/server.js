import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hello Kush");
});

// app.get('/api/auth/signup', (req, res) => {
//     console.log('Signup route');
// });

// app.get('/api/auth/login', (req, res) => {
//     console.log('Login route');
// });

// app.get('/api/auth/logout', (req, res) => {
//     console.log('Logout route');
// });

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));