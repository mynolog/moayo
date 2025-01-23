import { Router } from "express";
import {
  createReview,
  getReviewsByIsbn,
} from "@/controllers/review.controllers";

const router = Router();

router.post("/", createReview);
router.get("/:isbn", getReviewsByIsbn);

export default router;
