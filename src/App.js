import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks") || [])
  );
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: crypto.randomUUID(), name: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };

  const handleToggleTaskCompletion = (id) => {
    const newTasks = [...tasks].map((t) => {
      if (t.id === id) {
        return {
          ...t,
          completed: !t.completed,
        };
      } else {
        return t;
      }
    });

    setTasks(newTasks);
  };

  const handleClear = () => {
    setTasks([]);
  };

  let filteredTasks;
  if (filter === "all") {
    filteredTasks = tasks;
  } else if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  return (
    <div class="flex flex-col items-center space-y-4 w-[500px] mx-auto bg-slate-50">
      <h1 class="text-3xl font-bold">To-Do List</h1>
      <form onSubmit={handleAddTask} class="flex space-x-2">
        <input
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
          class="border border-gray-400 rounded py-2 px-3 w-full"
        />
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </form>
      <div class="space-x-2">
        <button
          onClick={() => setFilter("all")}
          class="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          class="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          class="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
        >
          Completed
        </button>
      </div>
      <ul class="w-full">
        {filteredTasks.map((task) => (
          <li key={task.id} class="flex items-center space-x-2 py-2 mx-[20%] ">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTaskCompletion(task.id)}
              class="rounded h-4 w-4 text-blue-600"
            />
            <span class={task.completed ? "line-through text-gray-400" : ""}>
              {task.name}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={handleClear}
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Clear
      </button>
    </div>
  );
}

export default App;
