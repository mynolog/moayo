import { Router } from "express";
import { signUpUser } from "@/controllers/user.controllers";
import { ROUTES } from "./apiRoutes";

const router = Router();

router.post(ROUTES.SIGN_UP, signUpUser);

export default router;
