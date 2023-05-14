import { taskRouter } from "./tasks.routes";
import { Router } from "express";

const router = Router();
router.use("/tasks", taskRouter);

export default router;
