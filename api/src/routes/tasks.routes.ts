import { Router } from "express";
import {
  createNewTask,
  deleteTask,
  getSortedTasks,
  rearrangeTaskOrder,
  updateTask,
} from "../controllers/tasks.controller";

const router = Router();

router.get("/", getSortedTasks);
router.post("/", createNewTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/rearrange/:id", rearrangeTaskOrder);

export { router as taskRouter };
