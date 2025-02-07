import Router from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import bookRoutes from './book.routes';
import reviewRoutes from './review.routes';
import { ROUTES } from './apiRoutes';

const router = Router();

// /api/auth
router.use(ROUTES.AUTH, authRoutes);
// /api/user
router.use(ROUTES.USERS, userRoutes);
// /api/books
router.use(ROUTES.BOOKS, bookRoutes);
// /api/books
router.use(ROUTES.BOOKS, reviewRoutes);

export default router;
