import { Router } from 'express';
import { createReview, getReviewsByIsbn } from '@/controllers/review.controllers';
import { ROUTES } from './apiRoutes';

const router = Router();

router.post(ROUTES.ROOT, createReview);
router.get(ROUTES.ISBN, getReviewsByIsbn);

export default router;
