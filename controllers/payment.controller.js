import prisma from "../database/postgresdb.js";

const checkAndUpdateOrderPaymentStatus = async (orderId) => {
    // Get all payments for this order
    const payments = await prisma.payment.findMany({
        where: { orderId },
        select: { amount: true }
    });

    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);

    // Get order and its items
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        select: { orderItems: { select: { quantity: true, image: { select: { softCopyPrice: true, hardCopyPrice: true } } } } }
    });

    if (!order) {
        console.error(`Order with ID ${orderId} not found.`);
        return;
    }

    // Calculate total order amount (assuming images have prices)
    const totalOrderAmount = order.orderItems.reduce((sum, item) => {
        const price = item.image.softCopyPrice ?? item.image.hardCopyPrice ?? 0; // Handle missing price
        return sum + item.quantity * price;
    }, 0);

    // Update order payment status if fully paid
    if (totalPaid >= totalOrderAmount) {
        await prisma.order.update({
            where: { id: orderId },
            data: { isPaid: true }
        });
    }
};

export const createPayment = async (req, res, next) => {
    try {
        const { orderId, amount } = req.body;

        const payment = await prisma.payment.create({ 
            data: { orderId, amount }
        });

        // Await the function call to ensure order payment status is updated
        await checkAndUpdateOrderPaymentStatus(orderId);

        res.status(201).json({ success: true, data: payment });
    } catch (error) {
        next(error);
    }
};

export const getPayments = async (req, res, next) => {
    try {
        const payments = await prisma.payment.findMany({
            include: {
                order: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({ success: true, data: payments });
    } catch (error) {
        next(error);
    }
};

export const updatePayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        const updatedPayment = await prisma.payment.update({ 
            where: { id }, 
            data: { amount } 
        });

        // Update order payment status
        await checkAndUpdateOrderPaymentStatus(updatedPayment.orderId);

        res.status(200).json({ success: true, data: updatedPayment });
    } catch (error) {
        next(error);
    }
};

export const deletePayment = async (req, res, next) => {
    try {
        const { id } = req.params;

        await prisma.payment.delete({ where: { id } });

        res.status(200).json({ success: true, message: "Payment deleted successfully" });
    } catch (error) {
        next(error);
    }
};
