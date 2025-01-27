import { Router } from 'express';
import { getBooks, getBooksByQuery } from '@/controllers/book.controllers';
import { ROUTES } from './apiRoutes';

const router = Router();

// /api/books
router.get(ROUTES.ROOT, getBooks);

// /api/books/search?query='query'
router.get(ROUTES.SEARCH, getBooksByQuery);

export default router;
