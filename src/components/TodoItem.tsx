import React from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onEdit, onDelete }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
        />
        <div className="todo-details">
          <h3 style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </h3>
          <p>{todo.details}</p>
          <p className="due-date">Due: {formatDate(todo.dueDate)}</p>
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => onEdit(todo)}>Edit</button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
