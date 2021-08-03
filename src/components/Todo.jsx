import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  return (
    <div>
      <label className='listItems'>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
          className='checkbox'
        />
        {todo.name}
      </label>
    </div>
  );
}
