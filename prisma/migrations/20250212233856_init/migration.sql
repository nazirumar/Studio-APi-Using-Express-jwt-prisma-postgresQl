-- CreateTable
CREATE TABLE "PhotographyStudio" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255),
    "phoneNumber" VARCHAR(20),
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhotographyStudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(255),
    "softCopyPrice" DOUBLE PRECISION,
    "hardCopyPrice" DOUBLE PRECISION,
    "totalPricePerDay" DOUBLE PRECISION,
    "studioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhotographyStudio_email_key" ON "PhotographyStudio"("email");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "PhotographyStudio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
