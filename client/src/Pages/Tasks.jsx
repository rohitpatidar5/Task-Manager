import React, { useState, useEffect } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  // Fetch all tasks from the server
  useEffect(() => {
    fetch('api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  // Add a new task
  const addTask = () => {
    if (!taskName) return;

    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: taskName }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks([...tasks, newTask]);
        setTaskName('');
      })
      .catch((err) => console.error('Error adding task:', err));
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    fetch(`/api/tasks/${id}`, { method: 'PUT' })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? { ...task, completed: updatedTask.completed } : task
          )
        );
      })
      .catch((err) => console.error('Error toggling task:', err));
  };

  // Delete a task
  const deleteTask = (id) => {
    fetch(`/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      })
      .catch((err) => console.error('Error deleting task:', err));
  };

  // Delete all tasks
  const deleteAllTasks = () => {
    fetch('/api/tasks', { method: 'DELETE' })
      .then(() => {
        setTasks([]);
      })
      .catch((err) => console.error('Error deleting all tasks:', err));
  };

  return (
    <div className="min-h-screen bg-[#182747] p-2 lg:p-8">
      <div className="max-w-xl mx-auto bg-[#5B8FB9] p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="border p-2 flex-1 rounded"
            placeholder="Enter a task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`flex justify-between items-center p-2 mb-2 rounded ${
                task.completed ? 'bg-gray-200 line-through opacity-50' : 'bg-gray-100'
              }`}
            >
              <div className=''>
              <div>{task.name}</div>
              <div className="flex space-x-2">
                <button
                  className=" px-3 py-1 bg-green-500 text-white rounded"
                  onClick={() => toggleComplete(task._id)}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={deleteAllTasks}
        >
          Delete All Tasks
        </button>
      </div>
    </div>
  );
};

export default Tasks;
