import { useEffect, useState } from "react";
import { getTodo, deleteTodo } from "../services/todoApi";

const TodoDetails = () => {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get ID from query parameter
  const params = new URLSearchParams(window.location.search);
  const todoId = params.get("id");

  

  useEffect(() => {
    const fetchTodo = async () => {
    if (!todoId) {
      setError("Todo ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getTodo(todoId);

      setTodo(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load todo.");
    } finally {
      setLoading(false);
    }
  };
    fetchTodo();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id);

      // Go back to Todo List after deleting
      window.location.href = "/todos.html";
    } catch (error) {
      console.error(error);
      setError("Failed to delete todo.");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading todo...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>

          <a
            href="/todos.html"
            className="mt-5 inline-block rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Back to Todos
          </a>
        </div>
      </main>
    );
  }

  if (!todo) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <a
          href="/todos.html"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          ← Back to Todos
        </a>

        {/* Todo Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          {/* Header */}
          <div className="flex items-start justify-between gap-5">

            <div>
              <div className="mb-3 flex items-center gap-3">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                    todo.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {todo.completed ? "Completed" : "In Progress"}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                    todo.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : todo.priority === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {todo.priority} priority
                </span>

              </div>

              <h1
                className={`text-3xl font-bold ${
                  todo.completed
                    ? "text-gray-400 line-through"
                    : "text-gray-900"
                }`}
              >
                {todo.title}
              </h1>
            </div>

          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Description
            </h2>

            <p className="mt-2 leading-7 text-gray-600">
              {todo.description || "No description provided."}
            </p>
          </div>

          {/* Information */}
          <div className="mt-8 grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Due Date
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {todo.dueDate
                  ? new Date(todo.dueDate).toLocaleDateString()
                  : "No due date"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Created
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {new Date(todo.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Last Updated
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {new Date(todo.updatedAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Status
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {todo.completed ? "Completed" : "Not completed"}
              </p>
            </div>

          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-100 pt-6">

            <button
              onClick={handleDelete}
              className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              Delete Todo
            </button>

          </div>

        </div>
      </div>
    </main>
  );
};

export default TodoDetails;