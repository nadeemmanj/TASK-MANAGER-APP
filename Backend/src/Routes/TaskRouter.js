import express from "express";
import { createTask, deleteTask, fetchAllTasks, updateTask } from "../Controllers/TaskController.js";


const router = express.Router();


router.get("/", fetchAllTasks)


router.post("/", createTask)


router.put("/:id",updateTask)


router.delete("/:id",deleteTask)



export default router;