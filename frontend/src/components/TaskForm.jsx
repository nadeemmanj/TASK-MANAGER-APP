import { useState } from "react";

const initialState = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
};

const TaskForm = ({ onCreate }) => {
  const [form, setForm] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await onCreate(form);
      setForm(initialState);
      setOpen(false);
    } catch (err) {
      if (err.response?.status !== 401) {
        setError(err.response?.data?.message || "Couldn't add the task. Try again.");
      }
      // 401s are handled globally (redirect to login), nothing to show here.
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-md border border-dashed border-primary/40 py-3 text-left font-body text-sm text-primary transition-colors hover:border-primary hover:bg-primary-light/40"
      >
        + Add a new entry
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-line bg-white p-4 sm:p-5"
    >
      <div className="grid gap-3">
        {error && (
          <p className="rounded-sm border border-danger/30 bg-danger-light px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}
        <input
          autoFocus
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="What needs doing?"
          className="border-b border-line bg-transparent pb-2 font-display text-base text-ink outline-none placeholder:text-slate-light focus:border-primary sm:text-lg"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Notes (optional)"
          rows={2}
          className="resize-none bg-transparent text-sm text-slate outline-none placeholder:text-slate-light"
        />
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full rounded-sm border border-line bg-white px-2 py-1.5 text-sm text-ink outline-none focus:border-primary sm:w-auto"
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full rounded-sm border border-line bg-white px-2 py-1.5 text-sm text-ink outline-none focus:border-primary sm:w-auto"
            />
          </div>
          <div className="flex gap-2 sm:ml-auto">
            <button
              type="button"
              onClick={() => {
                setForm(initialState);
                setOpen(false);
              }}
              className="flex-1 rounded-sm px-3 py-1.5 text-sm text-slate hover:text-ink sm:flex-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-sm bg-primary px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-60 sm:flex-none"
            >
              {submitting ? "Adding…" : "Add entry"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
