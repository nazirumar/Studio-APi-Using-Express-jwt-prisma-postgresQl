import { Router } from "express";
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post('/', createOrder);
orderRouter.get('/orders', getOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.put('/:id', updateOrder);
orderRouter.delete('/:id', deleteOrder);

export default orderRouter;
