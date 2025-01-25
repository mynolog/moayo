import { Router } from 'express';
import { getBooks } from '@/controllers/book.controllers';
import { ROUTES } from './api.routes';

const router = Router();

router.get(ROUTES.ROOT, getBooks);

export default router;
