import { Router } from 'express';
import { getUser, getAllUsers, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import { authorizeRole } from '../middlewares/protect.routes.role.js';
import { authenticate } from '../middlewares/auth.middlewares.js';
const userRouter = Router();

userRouter.get('/users', authenticate, getAllUsers);
userRouter.get('/users/:id', authenticate, authorizeRole(['ADMIN']), getUser);
userRouter.post('/', createUser);
userRouter.put('/:id', authenticate, authorizeRole(['ADMIN']), updateUser);
userRouter.delete('/:id', authenticate, authorizeRole(['ADMIN']), deleteUser);

export default userRouter;