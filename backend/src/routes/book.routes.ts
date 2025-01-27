import { Router } from 'express';
import { getBooks, getBooksByQuery, getBookByIsbn } from '@/controllers/book.controllers';
import { ROUTES } from './apiRoutes';

const router = Router();

// /api/books
router.get(ROUTES.ROOT, getBooks);

// /api/books/search?query='검색어'
router.get(ROUTES.SEARCH, getBooksByQuery);

// /api/books/:isbn?itemIdType=isbn13
router.get(ROUTES.BOOK_DETAIL, getBookByIsbn);

export default router;
