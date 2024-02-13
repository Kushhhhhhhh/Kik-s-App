import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match" });
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Define profile picture URLs based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create a new user instance
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'Male' ? boyProfilePic : girlProfilePic
        });

        if(newUser){
        // Save the new user to the database
        await newUser.save();

        // Respond with the created user data
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
    } else {
        // Respond with a generic error message
        res.status(500).json({ error: 'Invalid User data' });
    }
    } catch (error) {
        // Log the error for debugging purposes
        console.log('Signup Controller Error: ', error);
        
        // Respond with a generic error message
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const login = (req, res) => {
    res.send('login');
}

export const logout = (req, res) => {
    res.send('logout');
}