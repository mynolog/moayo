import Router from "express";
import reviewRoutes from "./review.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/reviews", reviewRoutes);
router.use("/user", userRoutes);

export default router;
