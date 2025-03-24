import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Todo App header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Todo App/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders empty state message when no tasks exist', () => {
  render(<App />);
  const emptyStateElement = screen.getByText(/No tasks found/i);
  expect(emptyStateElement).toBeInTheDocument();
});
