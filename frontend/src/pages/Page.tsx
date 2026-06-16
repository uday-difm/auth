import { useEffect, useState } from "react";
import Task from "../components/Task";
import axiosInstance from "../utils/axios";
import type { TaskType } from "../types/type";
import EditTask from "../components/EditTask";
import CreateTask from "../components/CreateTask";
import { useAuth } from "../context/AuthContext";

const Page = () => {
  const [tasks, setTasks] = useState<TaskType[] | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const auth = useAuth();
  
  const user = auth?.user;
  const logout = auth?.logout;

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
    <div className="min-h-screen bg-stone-950 p-8 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <header className="max-w-4xl mx-auto mb-8 bg-stone-900/40 backdrop-blur-md border border-stone-850 p-5 rounded-2xl shadow-xl flex flex-wrap justify-between items-center gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-stone-950 font-black text-lg shadow-md shadow-amber-500/10">
            T
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-100 tracking-tight">TaskFlow Dashboard</h1>
            {user && (
              <p className="text-xs text-stone-400">
                Logged in as <span className="text-amber-500 font-semibold">{user.full_name || user.email}</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-bold py-2 px-4 rounded-xl shadow-md shadow-amber-500/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
          >
            Create Task
          </button>
          {logout && (
            <button
              onClick={logout}
              className="bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-100 border border-stone-750 hover:border-stone-650 font-semibold py-2 px-4 rounded-xl transition-all duration-200 text-sm"
            >
              Sign Out
            </button>
          )}
        </div>
      </header>

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
