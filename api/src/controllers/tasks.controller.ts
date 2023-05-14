import { Request, Response } from "express";
import db from "../models";

export const getSortedTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await db.taskRepo.getSorted();
    res.send({ tasks });
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log("error", error);
  }
};

export const createNewTask = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const sort = await db.taskRepo.getMaxSortNumber();

    const tasks = await db.taskRepo.create({
      name,
      completed: false,
      sort: sort?.max + 1,
    });

    res.send({ tasks });
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log("error", error);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const tasks = await db.taskRepo.update(id, data);
    res.send({ tasks });
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log("error", error);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tasks = await db.taskRepo.delete(id);
    res.send({ tasks });
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log("error", error);
  }
};

export const rearrangeTaskOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { src, dest, action } = req.body;

    const tasks = await db.taskRepo.rearrange({ id, src, dest, action });
    res.send({ tasks });
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log("error", error);
  }
};
