import React, { Component } from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  state = {
    label: this.props.label
  }

  render() {
    const { id, created, onDeleteClick, onEditClick, onCheckClick, completed, editing } = this.props;
    const timeAgo = formatDistanceToNow(created, { includeSeconds: true });

    const onSubmitHandler = (e) => {
      e.preventDefault();
      this.props.changeLabel(id, this.state.label);
    };

    const inputChangeHandler = (e) => {
      this.setState({ label: e.target.value });
    };

    return (
      <li className={`${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onCheckClick} />
          <label onClick={onCheckClick}>
            <span className="description">{this.state.label}</span>
            <span className="created">created {timeAgo} ago</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="edit" onClick={onEditClick} />
          <button type="button" className="icon icon-destroy" aria-label="destroy" onClick={onDeleteClick} />
        </div>

        {editing && (
          <form onSubmit={onSubmitHandler}>
            <input type="text" className="edit" value={this.state.label} onChange={inputChangeHandler} />
          </form>
        )}
      </li>
    );
  }
}
