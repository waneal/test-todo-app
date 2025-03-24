import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Todo } from './types/todo';
import { 
  getTodosFromCookie, 
  addTodo, 
  updateTodo, 
  deleteTodo, 
  toggleTodoCompleted 
} from './utils/cookieUtils';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    // Load todos from cookie when component mounts
    const savedTodos = getTodosFromCookie();
    setTodos(savedTodos);
  }, []);

  const handleAddTodo = (todo: Todo) => {
    if (editingTodo) {
      // Update existing todo
      const updatedTodos = updateTodo(todo);
      setTodos(updatedTodos);
      setEditingTodo(null);
    } else {
      // Add new todo
      const newTodos = addTodo(todo);
      setTodos(newTodos);
    }
  };

  const handleToggleComplete = (id: string) => {
    const updatedTodos = toggleTodoCompleted(id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = deleteTodo(id);
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo App</h1>
      </header>
      <main className="app-content">
        <TodoForm onSubmit={handleAddTodo} editingTodo={editingTodo} />
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      </main>
      <footer className="app-footer">
        <p>Tasks are saved in browser cookies.</p>
      </footer>
    </div>
  );
};

export default App;
