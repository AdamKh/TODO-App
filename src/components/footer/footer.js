import PropTypes from 'prop-types'
import './footer.css'

import TaskFilter from '../task-filter'

export default function Footer({ taskLeftCount, onClearCompleted, onFilterChange, filter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{taskLeftCount} items left</span>
      <TaskFilter onFilterChange={onFilterChange} filter={filter} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  taskLeftCount: 0,
  onClearCompleted: () => {},
  onFilterChange: () => {},
  filter: 'all',
}

TaskFilter.propTypes = {
  taskLeftCount: PropTypes.number,
  onClearCompleted: PropTypes.func,
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
}
