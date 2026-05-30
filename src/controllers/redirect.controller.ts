import { Request, Response } from "express";
import { redirectToOriginalUrlService } from "../services/redirect.service";

interface RedirectParams {
  shortCode: string;
}

export async function redirectToOriginalUrl(
  req: Request<RedirectParams>,
  res: Response,
) {
  const { shortCode } = req.params;
  if (!shortCode) {
    return res.status(400).json({ message: "No short code provided" });
  }
  await redirectToOriginalUrlService(shortCode, res);
}
