import { Router } from "express";
import { getAllImages, getImageById, createImage, updateImage, deleteImage } from "../controllers/image.controller.js";

const imageRouter = Router();

imageRouter.get('/images', getAllImages);
imageRouter.get('/:id', getImageById);
imageRouter.post('/', createImage);
imageRouter.put('/:id', updateImage);
imageRouter.delete('/:id', deleteImage);

export default imageRouter;