import { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, format } from 'date-fns'
import './task.css'

export default class Task extends Component {
  constructor(props) {
    super(props)
    const { label, timerMillisec } = props
    this.state = {
      label,
      timerMillisec,
      isRunning: false,
      msPlus: timerMillisec ? -1000 : 1000,
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  componentDidUpdate() {
    const { completed } = this.props
    const { isRunning } = this.state
    if (completed && isRunning) {
      this.pauseTimer()
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  startTimer = () => {
    const { isRunning } = this.state
    if (!isRunning) {
      this.setState({ isRunning: true })
      this.interval = setInterval(() => {
        const { timerMillisec, msPlus } = this.state
        this.updateTimer(timerMillisec + msPlus)
      }, 1000)
    }
  }

  pauseTimer = () => {
    this.setState({ isRunning: false })
    clearInterval(this.interval)
  }

  updateTimer = (ms) => {
    if (ms < 0) {
      clearInterval(this.interval)
      const { onCheckClick } = this.props
      onCheckClick()
    } else {
      this.setState({ timerMillisec: ms })
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
    const { label, timerMillisec } = this.state
    const timeAgo = formatDistanceToNow(created, { includeSeconds: true })
    const timer = format(new Date(timerMillisec), 'mm:ss')

    return (
      <li className={`${completed && 'completed'} ${editing && 'editing'}`}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" checked={completed} onChange={onCheckClick} />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description">
              <button type="button" aria-label="start" className="icon icon-play" onClick={this.startTimer} />
              <button type="button" aria-label="stop" className="icon icon-pause" onClick={this.pauseTimer} />
              {timer}
            </span>
            <span className="description">created {timeAgo} ago</span>
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
