import { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      label: '',
      timerMinutes: null,
      timerSeconds: null,
    }
  }

  onSubmidHandler = (e, addItem) => {
    e.preventDefault()
    const { label, timerMinutes, timerSeconds } = this.state
    const timerMillisec = (timerMinutes * 60 + timerSeconds) * 1000
    if (label !== '' && label.trim() !== '') addItem(label, timerMillisec)
    this.setState({ label: '', timerMinutes: '', timerSeconds: '' })
  }

  labelChangeHandler = (e) => {
    this.setState({ label: e.target.value })
  }

  minutesChangeHandler = (e) => {
    this.setState({ timerMinutes: parseInt(e.target.value, 10) })
  }

  secondsChangeHandler = (e) => {
    this.setState({ timerSeconds: parseInt(e.target.value, 10) })
  }

  render() {
    const { label, timerMinutes, timerSeconds } = this.state
    const { addItem } = this.props
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={(e) => this.onSubmidHandler(e, addItem)}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(e) => this.labelChangeHandler(e)}
            value={label}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={(e) => this.minutesChangeHandler(e)}
            value={timerMinutes}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={(e) => this.secondsChangeHandler(e)}
            value={timerSeconds}
          />
          <button type="submit" aria-label="submit" />
        </form>
      </header>
    )
  }
}

NewTaskForm.defaultProps = {
  addItem: () => {},
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
}
