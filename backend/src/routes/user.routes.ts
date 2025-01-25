import { Router } from 'express';
import { signUpUser, signInUser } from '@/controllers/user.controllers';
import { ROUTES } from './apiRoutes';

const router = Router();

router.post(ROUTES.SIGN_UP, signUpUser);
router.post(ROUTES.SIGN_IN, signInUser);

export default router;
