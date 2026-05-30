import { Request, Response } from "express";
import { createUrlSchema } from "../validators/create-url.validator";
import { createShortUrlService } from "../services/url.service";

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const validatedData = createUrlSchema.safeParse(req.body);
    if(!validatedData.success){
      const formatted = validatedData.error.format();
      const flatErrors = Object.values(formatted).flat().filter(Boolean).map((err: any) => err._errors).flat()
      return res.status(400).json({message: flatErrors.join(", ")});
    }
    const result = await createShortUrlService(validatedData.data.originalUrl);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
