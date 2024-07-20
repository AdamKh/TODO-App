import React, { Component } from 'react';
import './task.css';

import { formatDistanceToNow } from 'date-fns'


export default class Task extends Component {

  render() {
    const { label, created, onDeleteClick, onEditClick, onCheckClick, completed, editing } = this.props;
    const timeAgo = formatDistanceToNow(created, { includeSeconds: true });

    return (
      <li className={(completed ? 'completed ' : '') + (editing ? 'editing' : '')}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={ onCheckClick }/>
        <label htmlFor="username" onClick={ onCheckClick }>
          <span id="username" className="description">
            {label}
          </span>
          <span className="created">created {timeAgo} ago</span>
        </label>
        <button type="button" className="icon icon-edit" aria-label="edit" onClick={ onEditClick }/>
        <button type="button" className="icon icon-destroy" aria-label="destroy" onClick={ onDeleteClick }/>
      </div>
      
      {editing ? <input  type="text" className="edit" value={label} /> : ''}
      </li>
    )
  }
}