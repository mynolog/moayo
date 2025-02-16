import { Router } from 'express';
import { getUserProfile } from '@/controllers/user.controllers';
import { getReviewsByUserId } from '@/controllers/review.controllers';
import { ROUTES } from './apiRoutes';

const router = Router();

// api/users/me
router.use(ROUTES.MY_PROFILE, getUserProfile);
// api/users/reviews
router.use(ROUTES.MY_REVIEWS, getReviewsByUserId);
export default router;
