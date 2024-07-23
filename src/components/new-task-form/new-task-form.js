import { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      label: '',
    }
  }

  render() {
    const { label } = this.state
    const { addItem } = this.props
    const onSubmidHandler = (e) => {
      e.preventDefault()
      if (label !== '') addItem(label)
      this.setState({ label: '' })
    }

    const inputChangeHandler = (e) => {
      this.setState({ label: e.target.value })
    }

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={onSubmidHandler}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={inputChangeHandler}
            value={label}
          />
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
