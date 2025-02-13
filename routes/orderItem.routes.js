import { Router } from "express";
import { createOrderItem, getOrderItems, getOrderItemById, updateOrderItem, deleteOrderItem } from "../controllers/orderItem.controller.js";

const orderItemRouter = Router();

orderItemRouter.post('/', createOrderItem);
orderItemRouter.get('/orderItems', getOrderItems);
orderItemRouter.get('/:id', getOrderItemById);
orderItemRouter.put('/:id', updateOrderItem);
orderItemRouter.delete('/:id', deleteOrderItem);

export default orderItemRouter;