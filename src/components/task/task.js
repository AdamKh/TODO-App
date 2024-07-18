import React from 'react';
import './task.css';

import { formatDistanceToNow } from 'date-fns'

export default function Task({ label, status='', onEdit=false, created }) {
    const timeAgo = formatDistanceToNow(created, { includeSeconds: true });
  
    return (
      <>
      <div className="view">
        <input className="toggle" type="checkbox" checked={status} />
        <label htmlFor="username">
          <span id="username" className="description">
            {label}
          </span>
          <span className="created">created {timeAgo} ago</span>
        </label>
        <button type="button" className="icon icon-edit" aria-label="edit" />
        <button type="button" className="icon icon-destroy" aria-label="destroy" />
      </div>
      
      {onEdit ? <input  type="text" className="edit" value={label} /> : ''}
      </>
    )
  }