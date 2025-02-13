import express from 'express';
import { createPhotographyStudio, getAllPhotographyStudios, getPhotographyStudios, updatePhotographyStudio, deletePhotographyStudio } from '../controllers/photography.studio.controller.js';
const router = express.Router();

router.post('/', createPhotographyStudio);
router.get('/studios', getPhotographyStudios);
router.get('/studios/all', getAllPhotographyStudios);
router.put('/studios/:id', updatePhotographyStudio);
router.delete('/studios/:id', deletePhotographyStudio);

export default router;
