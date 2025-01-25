import { Router } from 'express';
import { createReview, getReviewsByIsbn } from '@/controllers/review.controllers';
import { ROUTES } from './apiRoutes';

const router = Router();

// /api/books/:isbn/reviews
router.post(ROUTES.REVIEWS, createReview);
router.get(ROUTES.REVIEWS, getReviewsByIsbn);

export default router;
