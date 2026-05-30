import { prisma } from "../db/prisma";
import { generateShortCode } from "../utils/generateShortCode";

export interface CreateShortUrlResponse {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
}
export interface ShortCodeAnalyticsResponse {
  originalUrl: string;
  shortCode: string;
  clickCount: number;
  createdAt: string;
  lastAccessedAt: string;
}

export async function createShortUrlService(
  originalUrl: string,
): Promise<CreateShortUrlResponse> {
  let shortCode: string;
  let exists = true;

  const existingUrl = await prisma.url.findFirst({
    where: {
      originalUrl,
    },
  });

  if (existingUrl) {
    return {
      id: existingUrl.id,
      originalUrl: existingUrl.originalUrl,
      shortCode: existingUrl.shortCode,
      shortUrl: `localhost:8000/${existingUrl.shortCode}`,
    };
  }

  while (exists) {
    shortCode = generateShortCode(6);

    const existingUrl = await prisma.url.findUnique({ where: { shortCode } });

    exists = !!existingUrl;
  }

  const url = await prisma.url.create({
    data: {
      originalUrl,
      shortCode: shortCode!,
    },
  });

  return {
    id: url.id,
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    // shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
    shortUrl: `localhost:8000/${url.shortCode}`,
  };
}

export async function getShortCodeAnalyticsService(
  shortCode: string,
): Promise<ShortCodeAnalyticsResponse | null> {
  const existingShortCode = await prisma.url.findUnique({
    where: { shortCode },
  });
  if (!existingShortCode) {
    return null;
  }
  return {
    originalUrl: existingShortCode.originalUrl,
    shortCode: existingShortCode.shortCode,
    clickCount: existingShortCode.clickCount,
    createdAt: existingShortCode.createdAt.toISOString(),
    lastAccessedAt: existingShortCode?.lastAccessedAt
      ? existingShortCode.lastAccessedAt.toISOString()
      : "",
  };
}
