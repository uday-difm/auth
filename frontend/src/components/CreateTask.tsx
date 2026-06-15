// frontend/src/components/CreateTaskForm.tsx
import React, { useState } from "react";

interface CreateTaskFormProps {
  onSave: (newTask: any) => void;
  onCancel: () => void;
}

const getCurrentDateTime = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

const CreateTask: React.FC<CreateTaskFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assigned_member_1: "",
    assigned_member_2: "",
    priority: "Medium",
    deadline: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-stone-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-stone-700 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-400">
          Create New Task
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold text-left mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow border border-stone-600 focus:bg-stone-800 transition-all rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300  text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow border border-stone-600 focus:bg-stone-800 transition-all rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none h-24"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Member 1
              </label>
              <input
                type="text"
                name="assigned_member_1"
                value={formData.assigned_member_1}
                onChange={handleChange}
                className="shadow border border-stone-600 focus:bg-stone-800 transition-all rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Member 2
              </label>
              <input
                type="text"
                name="assigned_member_2"
                value={formData.assigned_member_2}
                onChange={handleChange}
                className="shadow border border-stone-600 focus:bg-stone-800 transition-all rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="shadow border border-stone-600 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Deadline
            </label>
            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              min={getCurrentDateTime()}
              className="shadow border border-stone-600 focus:bg-stone-800 transition-all rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
