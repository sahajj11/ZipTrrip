import { useEffect, useMemo, useState } from "react";
import TodoCard from "../components/TodoCard";
import TodoForm from "../components/TodoForm";
import {
  getTodos,
  updateTodo,
  deleteTodo,
} from "../services/todoApi";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  // Search & filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [editingTodo, setEditingTodo] = useState(null);

  

  useEffect(() => {
    const fetchTodos = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load todos.");
    } finally {
      setLoading(false);
    }
  };
    fetchTodos();
  }, []);

  // Toggle completed
  const handleToggle = async (todo) => {
    try {
      setError("");

      const updatedTodo = await updateTodo(todo._id, {
        completed: !todo.completed,
      });

      setTodos((currentTodos) =>
        currentTodos.map((item) =>
          item._id === todo._id ? updatedTodo : item
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to update todo.");
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    try {
      setError("");

      await deleteTodo(id);

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo._id !== id)
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete todo.");
    }
  };

  // Filter todos
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        todo.title.toLowerCase().includes(searchText) ||
        todo.description?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !todo.completed) ||
        (statusFilter === "completed" && todo.completed);

      const matchesPriority =
        priorityFilter === "all" ||
        todo.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    todos,
    search,
    statusFilter,
    priorityFilter,
  ]);

  const completedTodos = todos.filter(
    (todo) => todo.completed
  ).length;

  const activeTodos = todos.length - completedTodos;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Todos
              </h1>

              <p className="mt-1 text-gray-500">
                Stay organized and get things done.
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
            >
              + Add Todo
            </button>
          </div>

          {/* Stats */}
          {!loading && todos.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100">
                <p className="text-xs text-gray-500">
                  Total
                </p>

                <p className="mt-1 text-xl font-bold text-gray-900">
                  {todos.length}
                </p>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100">
                <p className="text-xs text-gray-500">
                  Active
                </p>

                <p className="mt-1 text-xl font-bold text-gray-900">
                  {activeTodos}
                </p>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100">
                <p className="text-xs text-gray-500">
                  Completed
                </p>

                <p className="mt-1 text-xl font-bold text-gray-900">
                  {completedTodos}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Search + Filters */}
        {!loading && todos.length > 0 && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search todos..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pl-10 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
              />

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>

            {/* Filters */}
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              {/* Status */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                  Status
                </p>

                <div className="flex flex-wrap gap-2">
                  {["all", "active", "completed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                        statusFilter === status
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                  Priority
                </p>

                <select
                  value={priorityFilter}
                  onChange={(e) =>
                    setPriorityFilter(e.target.value)
                  }
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-gray-400"
                >
                  <option value="all">All priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <p className="text-gray-500">
              Loading todos...
            </p>
          </div>
        )}

        {/* Empty database */}
        {!loading && todos.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white py-20 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
              ✓
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
              No todos yet
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Create your first todo and get started.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-5 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              Create Todo
            </button>
          </div>
        )}

        {/* No search/filter results */}
        {!loading &&
          todos.length > 0 &&
          filteredTodos.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                No matching todos
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Try changing your search or filters.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setPriorityFilter("all");
                }}
                className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </button>
            </div>
          )}

        {/* Todo list */}
        {!loading && filteredTodos.length > 0 && (
          <div className="space-y-4">
            {filteredTodos.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                 onEdit={(todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  }}
              />
            ))}
          </div>
        )}

        {/* Add Todo Modal */}
       {showForm && (
  <TodoForm
    todo={editingTodo}
    onClose={() => {
      setShowForm(false);
      setEditingTodo(null);
    }}
    onTodoCreated={(newTodo) => {
      setTodos((currentTodos) => [
        newTodo,
        ...currentTodos,
      ]);
    }}
    onTodoUpdated={(updatedTodo) => {
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo._id === updatedTodo._id
            ? updatedTodo
            : todo
        )
      );
    }}
  />
)}

      </div>
    </main>
  );
};

export default Todos;