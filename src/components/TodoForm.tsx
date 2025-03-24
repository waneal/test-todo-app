import React, { useState, useEffect } from 'react';
import { Todo } from '../types/todo';

interface TodoFormProps {
  onSubmit: (todo: Todo) => void;
  editingTodo: Todo | null;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, editingTodo }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDetails(editingTodo.details);
      setDueDate(editingTodo.dueDate.split('T')[0]);
    } else {
      resetForm();
    }
  }, [editingTodo]);

  const resetForm = () => {
    setTitle('');
    setDetails('');
    setDueDate('');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!dueDate) {
      setError('Due date is required');
      return;
    }

    const todo: Todo = {
      id: editingTodo ? editingTodo.id : Date.now().toString(),
      title,
      details,
      dueDate: new Date(dueDate).toISOString(),
      completed: editingTodo ? editingTodo.completed : false,
    };

    onSubmit(todo);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{editingTodo ? 'Edit Task' : 'Add New Task'}</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="details">Details:</label>
        <textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Enter task details"
          rows={3}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      
      <div className="form-actions">
        <button type="submit">{editingTodo ? 'Update Task' : 'Add Task'}</button>
        {editingTodo && <button type="button" onClick={resetForm}>Cancel</button>}
      </div>
    </form>
  );
};

export default TodoForm;
