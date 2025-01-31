import Router from 'express';
import userRoutes from './auth.routes';
import bookRoutes from './book.routes';
import reviewRoutes from './review.routes';
import { ROUTES } from './apiRoutes';

const router = Router();

// /api/auth
router.use(ROUTES.AUTH, userRoutes);
// /api/books
router.use(ROUTES.BOOKS, bookRoutes);
// /api/books
router.use(ROUTES.BOOKS, reviewRoutes);

export default router;
