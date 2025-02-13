import prisma from "../database/postgresdb.js";

// Create Order Item
export const createOrderItem = async (req, res, next) => {
    try {
        const { orderId, imageId, quantity } = req.body;  // Corrected to use req.body

        // Calculate total price
        const image = await prisma.image.findUnique({ where: { id: imageId } });
        let totalPrice = 0;
        if (image.softCopyPrice && image.hardCopyPrice) {
            totalPrice = (image.softCopyPrice * quantity) + (image.hardCopyPrice * quantity);
        } else if (image.softCopyPrice) {
            totalPrice = image.softCopyPrice * quantity;
        } else if (image.hardCopyPrice) {
            totalPrice = image.hardCopyPrice * quantity;
        } else {
            totalPrice = image.price * quantity;
        }

        // Validate orderId and imageId exist
        const orderExists = await prisma.order.findUnique({ where: { id: orderId } });
        const imageExists = await prisma.image.findUnique({ where: { id: imageId } });

        if (!orderExists || !imageExists) {
            return res.status(400).json({ success: false, message: "Invalid orderId or imageId" });
        }

        const newOrderItem = await prisma.orderItem.create({
            data: {
                orderId, 
                imageId,
                totalPrice,
                quantity: quantity || 1 } // Default quantity to 1 if not provided
        });

        res.status(201).json({
            success: true,
            message: "Order item created successfully",
            data: newOrderItem
        });
    } catch (error) {
        next(error);
    }
};

// Get All Order Items
export const getOrderItems = async (req, res, next) => {
    try {
        const orderItems = await prisma.orderItem.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                order: true,
                image: true
            }
        });
        res.status(200).json({ success: true, data: orderItems });
    } catch (error) {
        next(error);
    }
};

// Get Order Item by ID
export const getOrderItemById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const orderItem = await prisma.orderItem.findUnique({ where: { id } });

        if (!orderItem) {
            return res.status(404).json({ success: false, message: "Order item not found" });
        }

        res.status(200).json({ success: true, data: orderItem });
    } catch (error) {
        next(error);
    }
};

// Update Order Item
export const updateOrderItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { orderId, imageId, quantity } = req.body;

        const orderItem = await prisma.orderItem.findUnique({ where: { id } });
        if (!orderItem) {
            return res.status(404).json({ success: false, message: "Order item not found" });
        }

        const updatedOrderItem = await prisma.orderItem.update({
            where: { id },
            data: { orderId, imageId, quantity }
        });

        res.status(200).json({
            success: true,
            message: "Order item updated successfully",
            data: updatedOrderItem
        });
    } catch (error) {
        next(error);
    }
};

// Delete Order Item
export const deleteOrderItem = async (req, res, next) => {
    try {
        const { id } = req.params;

        const orderItem = await prisma.orderItem.findUnique({ where: { id } });
        if (!orderItem) {
            return res.status(404).json({ success: false, message: "Order item not found" });
        }

        await prisma.orderItem.delete({ where: { id } });
        res.status(200).json({ success: true, message: "Order item deleted successfully" });
    } catch (error) {
        next(error);
    }
};
