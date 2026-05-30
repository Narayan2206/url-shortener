import { Router } from "express";
import { redirectToOriginalUrl } from "../controllers/redirect.controller";

const router = Router();

router.get("/:shortCode", redirectToOriginalUrl);

export default router;
