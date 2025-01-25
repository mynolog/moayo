import { Router } from 'express';
import { getBooks } from '@/controllers/book.controllers';
import { ROUTES } from './apiRoutes';

const router = Router();

router.get(ROUTES.ROOT, getBooks);

export default router;
