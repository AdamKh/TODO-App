import PropTypes from 'prop-types'
import './task-list.css'

import Task from '../task'

export default function TaskList({ taskList, onDeleteClick, onEditClick, onCheckClick, changeLabel }) {
  const elements = taskList.map((task) => (
    <Task
      key={task.id}
      id={task.id}
      label={task.label}
      created={task.created}
      onDeleteClick={() => onDeleteClick(task.id)}
      onEditClick={() => onEditClick(task.id)}
      changeLabel={changeLabel}
      onCheckClick={() => onCheckClick(task.id)}
      completed={task.completed}
      editing={task.onEdit}
    />
  ))

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  onDeleteClick: () => {},
  onEditClick: () => {},
  changeLabel: () => {},
  onCheckClick: () => {},
}

TaskList.propTypes = {
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  changeLabel: PropTypes.func,
  onCheckClick: PropTypes.func,
}
