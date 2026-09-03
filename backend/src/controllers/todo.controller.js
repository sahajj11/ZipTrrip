import Todo from "../models/todo.model.js";

// CREATE TODO
export const createTodo = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        const todo = await Todo.create({
            title,
            description,
            priority,
            dueDate,
        });

        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: todo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create todo",
            error: error.message,
        });
    }
};


// GET ALL TODOS
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: todos,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch todos",
            error: error.message,
        });
    }
};


// GET SINGLE TODO
export const getTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        res.status(200).json({
            success: true,
            data: todo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch todo",
            error: error.message,
        });
    }
};


// UPDATE TODO
export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update todo",
            error: error.message,
        });
    }
};


// DELETE TODO
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            data: todo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete todo",
            error: error.message,
        });
    }
};