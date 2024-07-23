import { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

export default class Task extends Component {
  constructor(props) {
    super(props)
    const { label } = props
    this.state = {
      label,
    }
  }

  render() {
    const { id, created, onDeleteClick, onEditClick, changeLabel, onCheckClick, completed, editing } = this.props
    const { label } = this.state
    const timeAgo = formatDistanceToNow(created, { includeSeconds: true })

    const onSubmitHandler = (e) => {
      e.preventDefault()
      changeLabel(id, label)
    }

    const inputChangeHandler = (e) => {
      this.setState({ label: e.target.value })
    }

    return (
      <li className={`${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onCheckClick} />
          <label htmlFor="userName">
            <span id="userName" className="description">
              {label}
            </span>
            <span className="created">created{timeAgo} ago</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="edit" onClick={onEditClick} />
          <button type="button" className="icon icon-destroy" aria-label="destroy" onClick={onDeleteClick} />
        </div>

        {editing && (
          <form onSubmit={onSubmitHandler}>
            <input type="text" className="edit" value={label} onChange={inputChangeHandler} />
          </form>
        )}
      </li>
    )
  }
}

Task.defaultProps = {
  completed: false,
  editing: false,
  onDeleteClick: () => {},
  onEditClick: () => {},
  changeLabel: () => {},
  onCheckClick: () => {},
}

Task.propTypes = {
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  changeLabel: PropTypes.func,
  onCheckClick: PropTypes.func,
}
