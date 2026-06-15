// frontend/src/components/EditTaskForm.tsx
import React, { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  assigned_member_1: string;
  assigned_member_2: string | null;
  priority: string;
  deadline: string;
}

interface EditTaskFormProps {
  taskToEdit: Task; // The task data to pre-fill the form
  onSave: (updatedTask: Task) => void;
  onCancel: () => void;
}

const getCurrentDateTime = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

const EditTask: React.FC<EditTaskFormProps> = ({
  taskToEdit,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Task>(taskToEdit);

  // Update form data if taskToEdit changes (e.g., when editing a different task)
  useEffect(() => {
    const fn = () => {
      setFormData(taskToEdit);
    };
    fn();
  }, [taskToEdit]);

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
      <div className="bg-amber-100 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="assigned_member_1"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Assigned Member 1
            </label>
            <input
              type="text"
              id="assigned_member_1"
              name="assigned_member_1"
              value={formData.assigned_member_1}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="assigned_member_2"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Assigned Member 2 (Optional)
            </label>
            <input
              type="text"
              id="assigned_member_2"
              name="assigned_member_2"
              value={formData.assigned_member_2 || ""} // Handle null for optional field
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="deadline"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Deadline
            </label>
            <input
              type="datetime-local" // Use datetime-local for date and time input
              id="deadline"
              name="deadline"
              min={getCurrentDateTime()}
              value={new Date(formData.deadline).toISOString().slice(0, 16)}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
