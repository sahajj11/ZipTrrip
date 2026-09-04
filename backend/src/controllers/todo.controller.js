import Todo from "../models/todo.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// CREATE TODO
export const createTodo = asyncHandler(async (req, res) => {
    const { title, description, priority, dueDate } = req.body;

    const todo = await Todo.create({ title, description, priority, dueDate });

    return res
        .status(201)
        .json(new ApiResponse(201, todo, "Todo created successfully"));
});

// GET ALL TODOS
export const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, todos, "Todos fetched successfully"));
});

// GET SINGLE TODO
export const getTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
        throw new ApiError(404, "Todo not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, todo, "Todo fetched successfully"));
});

// UPDATE TODO
export const updateTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!todo) {
        throw new ApiError(404, "Todo not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, todo, "Todo updated successfully"));
});

// DELETE TODO
export const deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
        throw new ApiError(404, "Todo not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, todo, "Todo deleted successfully"));
});