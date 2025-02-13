import { Router } from "express";
import { getPayments, createPayment, updatePayment, deletePayment } from "../controllers/payment.controller.js";
import { authorizeRole } from "../middlewares/protect.routes.role.js";

const paymentRouter = Router();

paymentRouter.get('/', authorizeRole(['ADMIN', 'STAFF']),  getPayments);
paymentRouter.post('/', authorizeRole(['ADMIN', 'STAFF']), createPayment);
paymentRouter.put('/:id', authorizeRole(['ADMIN', 'STAFF']), updatePayment);
paymentRouter.delete('/:id', authorizeRole(['ADMIN', 'STAFF']), deletePayment);

export default paymentRouter;

