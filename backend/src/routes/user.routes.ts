import { Router } from 'express';
import { getUserProfile } from '@/controllers/user.controllers';
import { ROUTES } from './apiRoutes';

const router = Router();

router.use(ROUTES.MY_PROFILE, getUserProfile);

export default router;
