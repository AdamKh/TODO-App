import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, format } from 'date-fns'
import './task.css'

export default function Task({
  id,
  label,
  created,
  onDeleteClick,
  onEditClick,
  changeLabel,
  onCheckClick,
  completed,
  editing,
  timerMillisec,
  visible,
}) {
  const [labelState, setLabel] = useState(label)
  const [timerMillisecState, setTimerMillisec] = useState(timerMillisec)
  const [isRunning, setIsRunning] = useState(false)
  const [msPlus] = useState(timerMillisec ? -1000 : 1000)
  const intervalIDRef = useRef(null)

  const pauseTimer = () => {
    setIsRunning(false)
    clearInterval(intervalIDRef.current)
  }

  useEffect(() => {
    if (completed && isRunning) {
      pauseTimer()
    }
    return () => clearInterval(intervalIDRef.current)
  }, [completed])

  const updateTimer = (ms) => {
    if (ms < 0) {
      clearInterval(intervalIDRef.current)
      onCheckClick()
    } else {
      setTimerMillisec(ms)
    }
  }

  const startTimer = () => {
    if (!isRunning && !completed) {
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
    changeLabel(labelState)
  }

  const inputChangeHandler = (e) => {
    setLabel(e.target.value)
  }

  const timeAgo = formatDistanceToNow(created, { includeSeconds: true })
  const timer = format(new Date(timerMillisecState), 'mm:ss')

  return (
    <li className={`${completed && 'completed'} ${editing && 'editing'} ${!visible && 'hidden'}`}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" checked={completed} onChange={onCheckClick} />
        <label htmlFor={id}>
          <span className="title">{labelState}</span>
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
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <input type="text" className="edit" value={labelState} onChange={inputChangeHandler} />
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
}
