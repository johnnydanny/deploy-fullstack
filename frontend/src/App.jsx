import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async () => {
    if (!newTodo) return;
    await axios.post(API_URL, { title: newTodo });
    setNewTodo("");
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.put(`${API_URL}/${todo._id}`, { completed: !todo.completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>
      <input 
        type="text" value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="New Todo" 
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} style={{ margin: "10px 0" }}>
            <span 
              onClick={() => toggleTodo(todo)} 
              style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: 10 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
