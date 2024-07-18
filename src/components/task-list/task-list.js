import React from 'react';
import './task-list.css';

import Task from '../task/task';

export default function TaskList() {
  return (
    <ul className="todo-list">
        <li className="completed">
            <Task label='Completed Task' status='completed' created = {new Date()} />
        </li>

        <li className="editing">
            <Task label='Editing task' onEdit={true} created = {new Date()} />
        </li>

        <li>
            <Task label='Active Task' created = {new Date()} />
        </li>
    </ul>
  );
}
