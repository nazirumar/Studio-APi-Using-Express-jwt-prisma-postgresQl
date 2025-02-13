import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },  // Payload
        process.env.JWT_SECRET,            // Secret Key
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

export { generateToken };
