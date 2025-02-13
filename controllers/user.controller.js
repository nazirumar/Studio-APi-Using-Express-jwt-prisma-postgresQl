import prisma from "../database/postgresdb.js";
import { generateToken } from "../utils/utils.js";
import bcrypt from "bcrypt"

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany(); // Get all users
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};


export const getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) }, // Ensure id is an integer
      select: { id: true, name: true, email: true }, // Exclude password
    });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
export const createUser = async (req, res, next) => {

  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already in use" });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: role || "USER", // Default role if not provided
        },
    });

    // Generate Token
    const token = generateToken(newUser);

    // Return user & token
    res.status(201).json({
        success: true,
        data: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
        token,
    });

} catch (error) {
    res.status(500).json({ success: false, message: error.message });
}
};


export const updateUser = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};


