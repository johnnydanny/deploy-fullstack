import React, { useEffect, useState } from "react";
import axios from "axios";
/**
  Testing  1
*/
const API_URL = `${import.meta.env.VITE_API_URL}/todos`;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log("Todos fetched:", res.data);
      // Ensure todos is always an array
      setTodos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setTodos([]);
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async () => {
    if (!newTodo) return;
    try {
      await axios.post(API_URL, { title: newTodo });
      setNewTodo("");
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const toggleTodo = async (todo) => {
    try {
      await axios.put(`${API_URL}/${todo._id}`, { completed: !todo.completed });
      fetchTodos();
    } catch (err) {
      console.error("Error toggling todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>
      <input 
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {Array.isArray(todos) && todos.map(todo => (
          <li key={todo._id} style={{ margin: "10px 0" }}>
            <span
              onClick={() => toggleTodo(todo)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              style={{ marginLeft: 10 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
