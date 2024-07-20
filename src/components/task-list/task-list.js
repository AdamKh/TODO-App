import React from 'react';
import './task-list.css';

import Task from '../task';

export default function TaskList({taskList, onDeleteClick, onEditClick, onCheckClick}) {
  const elements = taskList.map((task) => {
      return <Task 
        key = {task.id}
        label={task.label} 
        created = {new Date()} 
        onDeleteClick = {() => onDeleteClick(task.id)}
        onEditClick = {() => onEditClick(task.id)}
        onCheckClick = {() => onCheckClick(task.id)}
        completed = {task.completed}
        editing = {task.onEdit}
      />
  })

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
}
