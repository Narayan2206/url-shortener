import { Router } from "express";
import { createShortUrl, getAnalytics } from "../controllers/url.controller";

const router = Router();

router.get("/:shortCode", getAnalytics);
router.post("/shorten", createShortUrl);

export default router;
