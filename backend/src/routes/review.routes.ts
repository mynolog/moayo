import { Router } from 'express';
import { createReview, getReviewsByIsbn } from '@/controllers/review.controllers';
import { ROUTES } from './api.routes';

const router = Router();

router.post(ROUTES.ROOT, createReview);
router.get(ROUTES.ISBN, getReviewsByIsbn);

export default router;

//TODO: reviews/:isbn -> books/:isbn/reviews
