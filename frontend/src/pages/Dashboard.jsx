import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { useToast } from "../context/ToastContext";

const filters = [
  { key: "all", label: "All" },
  { key: "todo", label: "To do" },
  { key: "in-progress", label: "In progress" },
  { key: "done", label: "Done" },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (err) {
      setError("Couldn't load tasks. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (form) => {
    const { data } = await api.post("/tasks", form);
    setTasks((prev) => [data, ...prev]);
    showToast("Task added", "success");
  };

  const handleUpdate = async (id, changes) => {
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, ...changes } : t)));
    try {
      await api.put(`/tasks/${id}`, changes);
      showToast("Task updated", "success");
    } catch {
      fetchTasks();
      showToast("Couldn't update task", "error");
    }
  };

  const handleDelete = async (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.delete(`/tasks/${id}`);
      showToast("Task removed", "success");
    } catch {
      fetchTasks();
      showToast("Couldn't remove task", "error");
    }
  };

  const visibleTasks = useMemo(
    () => (activeFilter === "all" ? tasks : tasks.filter((t) => t.status === activeFilter)),
    [tasks, activeFilter]
  );

  const counts = useMemo(() => {
    const c = { all: tasks.length, todo: 0, "in-progress": 0, done: 0 };
    tasks.forEach((t) => (c[t.status] = (c[t.status] || 0) + 1));
    return c;
  }, [tasks]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-6 flex items-end justify-between sm:mb-8">
        <div>
          <h1 className="font-display text-2xl text-ink sm:text-3xl">Today's ledger</h1>
          <p className="mt-1 text-sm text-slate">
            {counts.all} {counts.all === 1 ? "entry" : "entries"} · {counts.done} closed
          </p>
        </div>
      </div>

      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-line">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2 text-sm transition-colors ${
              activeFilter === f.key
                ? "border-primary text-primary"
                : "border-transparent text-slate hover:text-ink"
            }`}
          >
            {f.label}
            {f.key !== "all" && counts[f.key] > 0 && (
              <span className="ml-1.5 text-slate-light">{counts[f.key]}</span>
            )}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <TaskForm onCreate={handleCreate} />
      </div>

      {error && <p className="mb-4 text-sm text-danger">{error}</p>}

      {loading ? (
        <p className="text-sm text-slate">Loading entries…</p>
      ) : visibleTasks.length === 0 ? (
        <div className="rounded-md border border-dashed border-line px-4 py-12 text-center">
          <p className="font-display text-lg text-ink">Nothing here yet</p>
          <p className="mt-1 text-sm text-slate">Add an entry above to get started.</p>
        </div>
      ) : (
        <div className="rounded-md border border-line bg-white px-3 sm:px-5">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
