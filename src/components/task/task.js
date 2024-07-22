import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component {
  state = {
    label: this.props.label
  }

  static defaultProps = {
    completed: false,
    editing: false,
    created: new Date(),
    onDeleteClick: () => {},
    onEditClick: () => {},
    changeLabel: () => {},
    onCheckClick: () => {},
  }

  static propTypes = {
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    created: PropTypes.object,
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func,
    changeLabel: PropTypes.func,
    onCheckClick: PropTypes.func,
  }

  render() {
    const { id, created, onDeleteClick, onEditClick, changeLabel, onCheckClick, completed, editing } = this.props;
    const timeAgo = formatDistanceToNow(created, { includeSeconds: true });

    const onSubmitHandler = (e) => {
      e.preventDefault();
      changeLabel(id, this.state.label);
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
