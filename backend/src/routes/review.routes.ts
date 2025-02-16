import { Router } from 'express';
import {
  createReview,
  updateReview,
  deleteReview,
  getReviewsByIsbn,
} from '@/controllers/review.controllers';
import { ROUTES } from './apiRoutes';

const router = Router();

// /api/books/:isbn/reviews
router.post(ROUTES.REVIEWS, createReview);
router.patch(ROUTES.REVIEWS, updateReview);
router.delete(ROUTES.REVIEWS, deleteReview);
router.get(ROUTES.REVIEWS, getReviewsByIsbn);

export default router;
