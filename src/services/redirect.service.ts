import { Response } from "express";
import { prisma } from "../db/prisma";

export async function redirectToOriginalUrlService(
  shortCode: string,
  res: Response,
) {
  const url = await prisma.url.findUnique({
    where: {
      shortCode,
    },
  });

  if (!url) {
    return res.status(404).json({ message: "Short URL not found" });
  }

  if (!url.isActive) {
    return res.status(410).json({ message: "URL has been disabled" });
  }

  if (url.expiresAt && url.expiresAt < new Date()) {
    return res.status(410).json({ message: "URL has expired" });
  }

  await prisma.url.update({
    where: {
      id: url.id,
    },
    data: {
      clickCount: { increment: 1 },
      lastAccessedAt: new Date(),
    },
  });

  return res.redirect(url.originalUrl);
}
