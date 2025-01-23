import express from "express";
import {
  createReview,
  getReviewsByIsbn,
} from "@/controllers/review.controllers";
const router = express.Router();

router.post("/", createReview);
router.get("/:isbn", getReviewsByIsbn);

export default router;
