import prisma from "../database/postgresdb.js";



export const getAllImages = async (req, res, next) => {
    try {
        const images = await prisma.image.findMany();
        res.status(200).json({ success: true, data: images });
    } catch (error) {
        next(error);
    }
}

export const getImageById = async (req, res, next) => {
    try {
        const image = await prisma.image.findUnique({ where: { id: req.params.id } });
        res.status(200).json({ success: true, data: image });
    } catch (error) {
        next(error);
    }
}


export const createImage = async (req, res, next) => {
    try {
        const image = await prisma.image.create({ data: req.body });
        res.status(201).json({ success: true, data: image });
    } catch (error) {
        next(error);
    }
}

export const updateImage = async (req, res, next) => {
    try {
        const image = await prisma.image.update({ where: { id: req.params.id }, data: req.body });
        res.status(200).json({ success: true, data: image });
    } catch (error) {
        next(error);
    }
}

export const deleteImage = async (req, res, next) => {
    try {
        await prisma.image.delete({ where: { id: req.params.id } });
        res.status(200).json({ success: true, message: "Image deleted successfully" });
    } catch (error) {
        next(error);
    }
}
