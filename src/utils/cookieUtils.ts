import Cookies from 'js-cookie';
import { Todo } from '../types/todo';

const TODOS_COOKIE_KEY = 'todos';

export const getTodosFromCookie = (): Todo[] => {
  const todosJson = Cookies.get(TODOS_COOKIE_KEY);
  if (!todosJson) {
    return [];
  }

  try {
    return JSON.parse(todosJson);
  } catch (error) {
    console.error('Failed to parse todos from cookie:', error);
    return [];
  }
};

export const saveTodosToCookie = (todos: Todo[]): void => {
  Cookies.set(TODOS_COOKIE_KEY, JSON.stringify(todos), { expires: 365 });
};

export const addTodo = (todo: Todo): Todo[] => {
  const todos = getTodosFromCookie();
  const newTodos = [...todos, todo];
  saveTodosToCookie(newTodos);
  return newTodos;
};

export const updateTodo = (updatedTodo: Todo): Todo[] => {
  const todos = getTodosFromCookie();
  const newTodos = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
  saveTodosToCookie(newTodos);
  return newTodos;
};

export const deleteTodo = (id: string): Todo[] => {
  const todos = getTodosFromCookie();
  const newTodos = todos.filter((todo) => todo.id !== id);
  saveTodosToCookie(newTodos);
  return newTodos;
};

export const toggleTodoCompleted = (id: string): Todo[] => {
  const todos = getTodosFromCookie();
  const newTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodosToCookie(newTodos);
  return newTodos;
};
