import { Request, Response } from "express";
import { createUrlSchema } from "../validators/create-url.validator";
import {
  createShortUrlService,
  getShortCodeAnalyticsService,
} from "../services/url.service";
interface AnalyticsParams {
  shortCode: string;
}

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const validatedData = createUrlSchema.safeParse(req.body);
    if (!validatedData.success) {
      const formatted = validatedData.error.format();
      const flatErrors = Object.values(formatted)
        .flat()
        .filter(Boolean)
        .map((err: any) => err._errors)
        .flat();
      return res.status(400).json({ message: flatErrors.join(", ") });
    }
    const result = await createShortUrlService(validatedData.data.originalUrl);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getAnalytics = async (
  req: Request<AnalyticsParams>,
  res: Response,
) => {
  try {
    const { shortCode } = req.params;
    if (!shortCode) {
      return res.status(400).json({ message: "No short code provided." });
    }
    const result = await getShortCodeAnalyticsService(shortCode);
    if (!result) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
