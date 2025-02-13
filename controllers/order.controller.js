
import prisma from "../database/postgresdb.js";

export const createOrder = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const newOrder = await prisma.order.create({
      data: { userId }
    });
    res.status(201).json({ success: true, message: "Order created successfully", data: newOrder });
  } catch (error) {
    next(error);
  }     
}

export const getOrders = async (req, res, next) => {
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true
            }
        });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        next(error);
    }
}

export const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await prisma.order.findUnique({ where: { id } });
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        next(error);
    }
}

export const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;  // Order ID from URL
        const { userId, isPaid } = req.body; // Extract userId and isPaid from request body

        // Ensure the order exists
        const order = await prisma.order.findUnique({
            where: { id }
        });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Update the order
        const updatedOrder = await prisma.order.update({
            where: { id },
            data: {
                userId,
                isPaid
            }
        });

        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        next(error);
    }
};



export const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.order.delete({ where: { id } });
        res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        next(error);
    }
}


