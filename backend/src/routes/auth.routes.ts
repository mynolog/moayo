import { Router } from 'express';
import { signUpUser, signInUser, checkUserAuth } from '@/controllers/auth.controllers';
import { ROUTES } from './apiRoutes';

const router = Router();

router.get(ROUTES.CHECK, checkUserAuth);
router.post(ROUTES.SIGN_UP, signUpUser);
router.post(ROUTES.SIGN_IN, signInUser);

export default router;
