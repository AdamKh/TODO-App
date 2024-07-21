import React from 'react';
import TaskFilter from '../task-filter'
import './footer.css';

export default function Footer({taskLeftCount, onClearCompleted, onFilterChange, filter}) {
  return (
    <footer className="footer">
      <span className="todo-count">{taskLeftCount} items left</span>
      <TaskFilter onFilterChange={onFilterChange} filter={filter}/>
      <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
    </footer>
  );
}

