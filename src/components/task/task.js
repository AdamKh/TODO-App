import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, format } from 'date-fns'
import './task.css'

export default function Task({
  id,
  label: initialLabel,
  created,
  onDeleteClick,
  onEditClick,
  changeLabel,
  onCheckClick,
  completed,
  editing,
  timerMillisec: initialTimerMillisec,
  visible,
}) {
  const [label, setLabel] = useState(initialLabel)
  const [timerMillisec, setTimerMillisec] = useState(initialTimerMillisec)
  const [isRunning, setIsRunning] = useState(false)
  const msPlus = initialTimerMillisec ? -1000 : 1000
  const intervalIDRef = useRef(null)

  const pauseTimer = () => {
    setIsRunning(false)
    clearInterval(intervalIDRef.current)
  }

  useEffect(() => {
    if (completed && isRunning) {
      pauseTimer()
    }
  }, [completed, isRunning])

  useEffect(() => () => clearInterval(intervalIDRef.current), [])

  const updateTimer = (ms) => {
    if (ms < 0) {
      clearInterval(intervalIDRef.current)
      onCheckClick()
    } else {
      setTimerMillisec(ms)
    }
  }

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true)
      intervalIDRef.current = setInterval(() => {
        setTimerMillisec((prevMs) => {
          const newMs = prevMs + msPlus
          updateTimer(newMs)
          return newMs
        })
      }, 1000)
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    changeLabel(label)
  }

  const inputChangeHandler = (e) => {
    setLabel(e.target.value)
  }

  const timeAgo = formatDistanceToNow(created, { includeSeconds: true })
  const timer = format(new Date(timerMillisec), 'mm:ss')

  return (
    <li className={`${completed && 'completed'} ${editing && 'editing'} ${!visible && 'hidden'}`}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" checked={completed} onChange={onCheckClick} />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <span className="description">
            <button type="button" aria-label="start" className="icon icon-play" onClick={startTimer} />
            <button type="button" aria-label="stop" className="icon icon-pause" onClick={pauseTimer} />
            {timer}
          </span>
          <span className="description">created {timeAgo} ago</span>
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
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired,
  timerMillisec: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
}
