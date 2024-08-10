import { useState } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default function NewTaskForm({ addItem }) {
  const [label, setLabel] = useState('')
  const [timerMinutes, setTimerMinutes] = useState(null)
  const [timerSeconds, setTimerSeconds] = useState(null)

  const onSubmidHandler = (e) => {
    e.preventDefault()
    if (timerMinutes < 0 || timerSeconds < 0) {
      setLabel('')
      setTimerMinutes('')
      setTimerSeconds('')
    } else {
      const timerMillisec = (timerMinutes * 60 + timerSeconds) * 1000
      if (label !== '' && label.trim() !== '') addItem(label, timerMillisec)
      setLabel('')
      setTimerMinutes('')
      setTimerSeconds('')
    }
  }

  const labelChangeHandler = (e) => {
    setLabel(e.target.value)
  }

  const minutesChangeHandler = (e) => {
    const minutes = e.target.value
    setTimerMinutes(parseInt(minutes, 10))
  }

  const secondsChangeHandler = (e) => {
    const seconds = e.target.value
    setTimerSeconds(parseInt(seconds, 10))
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={(e) => onSubmidHandler(e)}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(e) => labelChangeHandler(e)}
          value={label}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={(e) => minutesChangeHandler(e)}
          value={timerMinutes}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={(e) => secondsChangeHandler(e)}
          value={timerSeconds}
        />
        <button type="submit" aria-label="submit" />
      </form>
    </header>
  )
}

NewTaskForm.defaultProps = {
  addItem: () => {},
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
}
