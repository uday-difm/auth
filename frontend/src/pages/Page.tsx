import { useEffect, useState } from "react";
import Task from "../components/Task";
import axiosInstance from "../utils/axios";
import type { TaskType } from "../types/type";
import EditTask from "../components/EditTask";
import CreateTask from "../components/CreateTask";

const Page = () => {
  const [tasks, setTasks] = useState<TaskType[] | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getTasks = async () => {
    const results = await axiosInstance.get("/");
    return results.data.rows;
  };
  console.log(tasks);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, [tasks]);

  const handleSaveNewTask = async (newTaskData: any) => {
    try {
      await axiosInstance.post("/createTask", newTaskData);
      setShowCreateModal(false);
      setTasks(null);
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  const handleEditTask = (taskId: number) => {
    console.log(`Edit task with ID: ${taskId}`);
    const task = tasks?.find((t) => t.id === taskId);
    if (task) {
      setTaskToEdit(task);
      setShowEditModal(true);
    }
  };

  const handleUpdateTask = async (updatedTask: TaskType) => {
    try {
      await axiosInstance.put(`/edit/${updatedTask.id}`, updatedTask);
      console.log(`Task ${updatedTask.id} updated successfully.`);
      setShowEditModal(false);
      setTaskToEdit(null);
      setTasks(null);
    } catch (error) {
      console.error(`Failed to update task ${updatedTask.id}:`, error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (window.confirm(`Are you sure you want to delete task ${taskId}?`)) {
      try {
        await axiosInstance.delete(`/delete/${taskId}`);
        setTasks((prevTasks) =>
          prevTasks ? prevTasks.filter((task) => task.id !== taskId) : null,
        );
        console.log(`Task ${taskId} deleted successfully.`);
      } catch (error) {
        console.error(`Failed to delete task ${taskId}:`, error);
      }
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setTaskToEdit(null);
  };

  return (
    <div className="min-h-screen bg-stone-950 p-8">
      <nav className="flex flex-end gap-2"></nav>
      <section className="max-w-4xl mx-auto mb-8 p-6 rounded-lg shadow-md flex flex-wrap justify-center gap-10 sm:gap-0 sm:justify-between  items-center">
        <h1 className="text-3xl font-bold text-gray-300">Task Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded-md transition-colors duration-200"
        >
          Create Task
        </button>
      </section>

      <section className="max-w-4xl mx-auto">
        {tasks === null ? (
          <p className="text-center text-lg text-gray-700">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-lg text-gray-700">
            No tasks found. Create a new task!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </section>

      {showCreateModal && (
        <CreateTask
          onSave={handleSaveNewTask}
          onCancel={() => setShowCreateModal(false)}
        />
      )}
      {/* Render the EditTaskForm modal conditionally */}
      {showEditModal && taskToEdit && (
        <EditTask
          taskToEdit={taskToEdit}
          onSave={handleUpdateTask}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};
export default Page;
