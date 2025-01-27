import Router from 'express';
import userRoutes from './user.routes';
import bookRoutes from './book.routes';
import reviewRoutes from './review.routes';
import { ROUTES } from '@/routes/apiRoutes';

const router = Router();

// /api/users
router.use(ROUTES.USERS, userRoutes);
// /api/books
router.use(ROUTES.BOOKS, bookRoutes);
// /api/books
router.use(ROUTES.BOOKS, reviewRoutes);

export default router;
