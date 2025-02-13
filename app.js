import express from 'express';
import { PORT } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import photographyStudioRoutes from './routes/photography.studio.routes.js';
import orderRoutes from './routes/order.routes.js';
import orderItemRoutes from './routes/orderItem.routes.js';
import imageRoutes from './routes/image.routes.js';
import userRoutes from './routes/user.routes.js';
import paymentRouter from './routes/payment.routes.js';




const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use("/api/auth", authRoutes);
app.use("/api/studio", photographyStudioRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/orderItem", orderItemRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRouter);
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Express API!" });
});


app.listen(PORT, async () => {
    console.log(`Pos API is running on http://localhost:${PORT}`)
  
  });
  
  export default app;