
import prisma from "../database/postgresdb.js";


export const getAllPhotographyStudios = async (req, res, next) => {
  try {
    const studios = await prisma.photographyStudio.findMany();
    res.status(200).json({ success: true, data: studios });
  } catch (error) {
    next(error);
  }
}

export const createPhotographyStudio = async (req, res, next) => {
  try {
    const { name, address, phoneNumber, email, images } = req.body;
    const newStudio = await prisma.photographyStudio.create({
      data: {
        name,
        address,
        phoneNumber,
        email,
        Images: {
          create: images.map(image => ({
            description: image.description ?? null,
            softCopyPrice: image.softCopyPrice ?? null,
            hardCopyPrice: image.hardCopyPrice ?? null
          })),
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Photography studio created successfully",
      data: newStudio,
    });
  } catch (error) {
    next(error);
  }
};

export const getPhotographyStudios = async (req, res, next) => {
  try {
    const studios = await prisma.photographyStudio.findMany({
      include: {
        images: true,
      },
    });

    res.status(200).json({
      success: true,
      data: studios,
    });
  } catch (error) {
    next(error);
  }
};

export const getPhotographyStudio = async (req, res, next) => {
  try {
    const studio = await prisma.photographyStudio.findUnique({
      where: { id: req.params.id },
      include: {
        images: true,
      },
    });

    if (!studio) {
      return res.status(404).json({ success: false, message: "Photography studio not found" });
    }

    res.status(200).json({
      success: true,
      data: studio,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePhotographyStudio = async (req, res, next) => {
  try {
    const { name, address, phoneNumber, email, images } = req.body;

    const updatedStudio = await prisma.photographyStudio.update({
      where: { id: req.params.id },
      data: {
        name,
        address,
        phoneNumber,
        email,
        images: {
          deleteMany: {},
          create: images.map(image => ({
            description: image.description,
            softCopyPrice: image.softCopyPrice,
            hardCopyPrice: image.hardCopyPrice,
            totalPricePerDay: image.totalPricePerDay,
          })),
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Photography studio updated successfully",
      data: updatedStudio,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePhotographyStudio = async (req, res, next) => {
  try {
    await prisma.photographyStudio.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({
      success: true,
      message: "Photography studio deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
