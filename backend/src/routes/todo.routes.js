import express from "express";

import {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();


// CREATE TODO
router.post("/", createTodo);

// GET ALL TODOS
router.get("/", getTodos);

// GET SINGLE TODO
router.get("/:id", getTodo);

// UPDATE TODO
router.patch("/:id", updateTodo);

// DELETE TODO
router.delete("/:id", deleteTodo);

export default router;