import { Router } from "express";
import { signUpUser } from "@/controllers/user.controllers";

const router = Router();

router.post("/sign-up", signUpUser);

export default router;
