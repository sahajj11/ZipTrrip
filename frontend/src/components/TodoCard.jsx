const TodoCard = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
            className="mt-1 h-5 w-5 cursor-pointer accent-black"
          />

          <div>
            <h3
              className={`text-lg font-semibold ${
                todo.completed
                  ? "text-gray-400 line-through"
                  : "text-gray-900"
              }`}
            >
              {todo.title}
            </h3>

            {todo.description && (
              <p className="mt-1 text-sm text-gray-500">
                {todo.description}
              </p>
            )}
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
            todo.priority === "high"
              ? "bg-red-100 text-red-600"
              : todo.priority === "medium"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {todo.priority}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          {todo.dueDate ? (
            <p className="text-sm text-gray-500">
              Due {new Date(todo.dueDate).toLocaleDateString()}
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              No due date
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`/todo.html?id=${todo._id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View
          </a>

          <button
            onClick={() => onDelete(todo._id)}
            className="text-sm font-medium text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;