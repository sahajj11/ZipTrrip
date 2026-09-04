import express from "express";
import cors from "cors";

import todoRoutes from "./routes/todo.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Todo API is running",
    });
});

app.use("/api/todos", todoRoutes);

// 404 handler for unmatched routes
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route not found" });
});


app.use(errorHandler);

export default app;