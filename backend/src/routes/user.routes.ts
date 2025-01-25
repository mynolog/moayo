import { Router } from 'express';
import { signUpUser, signInUser } from '@/controllers/user.controllers';
import { ROUTES } from './api.routes';

const router = Router();

router.post(ROUTES.SIGN_UP, signUpUser);
router.post(ROUTES.SIGN_IN, signInUser);

export default router;
