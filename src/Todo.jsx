// Import the necessary modules from the React library and CSS file
import React, { useState } from "react";
import "./index.css";

// Define a functional component called Todo
const Todo = () => {
  // Define state variables using the useState hook
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to-do");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("low");

  // Define a function to add a new todo item to the list
  const addTodo = () => {
    // Create a new todo object with input values and other properties
    const newTodo = {
      id: Date.now(),
      title: title,
      description: description,
      status: status,
      deadline: new Date(deadline),
      priority: priority,
      isOverdue: new Date(deadline) < new Date(), // Check if the deadline is overdue
    };

    // Update the todos state with the new todo object
    setTodos([...todos, newTodo]);

    // Reset form fields to empty values
    setTitle("");
    setDescription("");
    setStatus("to-do");
    setDeadline("");
    setPriority("low");
  };

  // Define a function to delete a todo item based on its ID
  const deleteTodo = (id) => {
    // Filter out the todo item with the specified ID and update the todos state
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Define a function to update a todo item based on its ID and updated fields
  const updateTodo = (id, updatedFields) => {
    // Map through the todos and update the specified todo with the new fields
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo));
    setTodos(updatedTodos);
  };

  // Filter todo items based on their status
  const todoItems = todos.filter((todo) => todo.status === "to-do");
  const inProgressItems = todos.filter((todo) => todo.status === "in-progress");
  const doneItems = todos.filter((todo) => todo.status === "done");
  const overdueItems = todos.filter((todo) => todo.isOverdue); // Filter out overdue items

  // Define functions to count todo items based on their status
  const CountTodoItems = () => todos.filter((todo) => todo.status === "to-do").length;
  const CountInProgressItems = () => todos.filter((todo) => todo.status === "in-progress").length;
  const CountDoneItems = () => todos.filter((todo) => todo.status === "done").length;
  const countOverdueItems = () => todos.filter((todo) => todo.isOverdue).length; // Count overdue items

  // Define a function to sort todo items by priority
  const sortTodoItemsByPriority = () => {
    // Clone the todoItems array and sort it based on priority order
    const sortedTodoItems = [...todoItems].sort((a, b) => {
      const priorityOrder = { low: 3, medium: 2, high: 1 }; // Define priority order
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    return sortedTodoItems;
  };

  // JSX structure for the component
  return (
    <div>
      {/* Form for adding new todo items */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <p>Title</p>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <p>Description</p>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
        <p>Status</p>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="to-do">To-Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <p>Due Date</p>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <p>Priority</p>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {/* Display todo items based on their status */}
      <div className="column">
        <h2>To-Do ({CountTodoItems()})</h2>
        {/* Map through sorted todo items and display relevant information */}
        {sortTodoItemsByPriority().map((todo) => (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
            <p>Deadline: {todo.deadline.toString()}</p>
            <p>Priority: {todo.priority}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            {/* Dropdown for status update */}
            <select
              value={todo.status}
              onChange={(e) => updateTodo(todo.id, { status: e.target.value })}
            >
              <option value="to-do">To-Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        ))}
      </div>

      {/* Display in-progress todo items */}
      <div className="column">
        <h2>In Progress ({CountInProgressItems()})</h2>
        {/* Map through in-progress todo items and display relevant information */}
        {inProgressItems.map((todo) => (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
            <p>Deadline: {todo.deadline.toString()}</p>
            <p>Priority: {todo.priority}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            {/* Dropdown for status update */}
            <select
              value={todo.status}
              onChange={(e) => updateTodo(todo.id, { status: e.target.value })}
            >
              <option value="to-do">To-Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        ))}
      </div>

      {/* Display done todo items */}
      <div className="column">
        <h2>Done ({CountDoneItems()})</h2>
        {/* Map through done todo items and display relevant information */}
        {doneItems.map((todo) => (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
            <p>Deadline: {todo.deadline.toString()}</p>
            <p>Priority: {todo.priority}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            {/* Dropdown for status update */}
            <select
              value={todo.status}
              onChange={(e) => updateTodo(todo.id, { status: e.target.value })}
            >
              <option value="to-do">To-Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        ))}
      </div>

      {/* Display overdue todo items */}
      <div className="column">
        <h2>OVERDUE ({countOverdueItems()})</h2>
        {/* Map through overdue todo items and display relevant information */}
        {overdueItems.map((todo) => (
          <div key={todo.id} className={`todo-item ${todo.isOverdue ? 'overdue' : ''}`}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
            <p>Deadline: {todo.deadline.toString()}</p>
            <p>Priority: {todo.priority}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            {/* Dropdown for status update */}
            <select
              value={todo.status}
              onChange={(e) => updateTodo(todo.id, { status: e.target.value })}
            >
              <option value="to-do">To-Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the Todo component to be used in other parts of the application
export default Todo;






