import { useState } from "react";

const priorityColor = {
  low: "bg-slate-light",
  medium: "bg-teal",
  high: "bg-primary",
};

const statusOrder = ["todo", "in-progress", "done"];
const statusLabel = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

const formatDate = (d) => {
  if (!d) return null;
  return new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const cycleStatus = () => {
    const next = statusOrder[(statusOrder.indexOf(task.status) + 1) % statusOrder.length];
    onUpdate(task._id, { status: next });
  };

  const saveEdit = () => {
    if (!title.trim()) return;
    onUpdate(task._id, { title, description });
    setEditing(false);
  };

  const isDone = task.status === "done";

  return (
    <div className="group flex items-start gap-2 border-b border-line py-3 last:border-b-0 sm:gap-3 sm:py-4">
      <button
        onClick={cycleStatus}
        title={`Status: ${statusLabel[task.status]} — click to advance`}
        className={`mt-1 h-4 w-4 shrink-0 rounded-full border-2 transition-colors ${
          isDone
            ? "border-teal bg-teal"
            : task.status === "in-progress"
            ? "border-primary bg-primary-light"
            : "border-slate-light"
        }`}
      />

      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${priorityColor[task.priority]}`} />

      <div className="min-w-0 flex-1">
        {editing ? (
          <div className="grid gap-2">
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-b border-line bg-transparent pb-1 font-display text-base text-ink outline-none focus:border-primary"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="resize-none bg-transparent text-sm text-slate outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={saveEdit}
                className="rounded-sm bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary-dark"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="rounded-sm px-3 py-1 text-xs text-slate hover:text-ink"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p
              onClick={() => setEditing(true)}
              className={`cursor-text break-words font-display text-sm leading-snug sm:text-base ${
                isDone ? "text-slate-light line-through" : "text-ink"
              }`}
            >
              {task.title}
            </p>
            {task.description && (
              <p className="mt-0.5 break-words text-sm text-slate">{task.description}</p>
            )}
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-light">
              <span>{statusLabel[task.status]}</span>
              {task.dueDate && <span>Due {formatDate(task.dueDate)}</span>}
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => onDelete(task._id)}
        className="mt-1 shrink-0 text-xs text-slate-light transition-opacity hover:text-ink sm:opacity-0 sm:group-hover:opacity-100"
      >
        Remove
      </button>
    </div>
  );
};

export default TaskItem;
