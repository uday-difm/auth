import React from "react";
import type { TaskType } from "../types/type";

interface TaskItemProps {
  task: TaskType;
  onEdit: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const formattedDeadline = new Date(task.deadline).toLocaleString();

  const getPriorityColorClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-600 font-semibold";
      case "medium":
        return "bg-yellow-600 font-semibold";
      case "low":
        return "bg-green-600 font-semibold";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="bg-stone-800 rounded-lg shadow-sm p-5 mb-4 hover:shadow-md transition-shadow duration-200">
      <h3 className="text-3xl font-bold text-gray-200 mb-2">{task.title}</h3>
      <div className="flex flex-col gap-2 items-start">
        <p className="text-gray-300 mb-2">
          <strong>Description:</strong> {task.description}
        </p>
        <p className="text-gray-200 mb-2">
          <strong>Assigned To:</strong> {task.assigned_member_1}
          {task.assigned_member_2 && <>, {task.assigned_member_2}</>}
        </p>
        <p className="text-gray-200 mb-2 ">
          <strong>Priority:</strong>{" "}
          <span
            className={`${getPriorityColorClass(task.priority)} py-1 px-3 rounded-full`}
          >
            {task.priority}
          </span>
        </p>
        <p className="text-gray-200 mb-4">
          <strong>Deadline:</strong> {formattedDeadline}
        </p>
      </div>
      <div className="flex space-x-3 mt-3">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          onClick={() => onEdit(task.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
