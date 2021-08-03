import TodoList from "./components/TodoList.jsx";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const LOCAl_STORAGE_KEY = "todoWebsite.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAl_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAl_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.title = "Todo App";
  }, []);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  function handleClearAll() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="listWrapper">
      <div className="todoElement">
        <div className="listElement">
          <h2 className="listSubtitle">Todo:</h2>
          <TodoList todosProp={todos} toggleTodo={toggleTodo} />
        </div>
        <input ref={todoNameRef} type="text" className="listInput" />
        <div className="buttonParent">
          <button className="listButton1" onClick={handleAddTodo}>
            Add Todo
          </button>
          <button className="listButton2" onClick={handleClearTodos}>
            Clear Completed
          </button>
        </div>
        <button onClick={handleClearAll} className="logoutButton">
          Clear All
        </button>
        <div className="bottomText">
          {todos.filter((todo) => !todo.complete).length} left to complete
        </div>
      </div>
    </div>
  );
}

export default App;
