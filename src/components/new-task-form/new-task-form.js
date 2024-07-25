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

  onSubmidHandler = (e, addItem) => {
    e.preventDefault()
    const { label } = this.state
    if (label !== '' && label.trim() !== '') addItem(label)
    this.setState({ label: '' })
  }

  inputChangeHandler = (e) => {
    this.setState({ label: e.target.value })
  }

  render() {
    const { label } = this.state
    const { addItem } = this.props
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={(e) => this.onSubmidHandler(e, addItem)}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(e) => this.inputChangeHandler(e)}
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
