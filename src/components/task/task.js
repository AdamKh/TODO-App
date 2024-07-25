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

  onSubmitHandler = (e) => {
    e.preventDefault()
    const { label } = this.state
    const { changeLabel } = this.props
    changeLabel(label)
  }

  inputChangeHandler = (e) => {
    this.setState({ label: e.target.value })
  }

  render() {
    const { id, created, onDeleteClick, onEditClick, onCheckClick, completed, editing } = this.props
    const { label } = this.state
    const timeAgo = formatDistanceToNow(created, { includeSeconds: true })

    return (
      <li className={`${completed && 'completed'} ${editing && 'editing'}`}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" checked={completed} onChange={onCheckClick} />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">created{timeAgo} ago</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="edit" onClick={onEditClick} />
          <button type="button" className="icon icon-destroy" aria-label="destroy" onClick={onDeleteClick} />
        </div>

        {editing && (
          <form onSubmit={(e) => this.onSubmitHandler(e)}>
            <input type="text" className="edit" value={label} onChange={this.inputChangeHandler} />
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
