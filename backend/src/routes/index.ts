import Router from 'express';
import reviewRoutes from './review.routes';
import userRoutes from './user.routes';
import bookRoutes from './book.routes';
import { ROUTES } from '@/routes/apiRoutes';

const router = Router();

router.use(ROUTES.REVIEWS, reviewRoutes);
router.use(ROUTES.USERS, userRoutes);
router.use(ROUTES.BOOKS, bookRoutes);

export default router;
