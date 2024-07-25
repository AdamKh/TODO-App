import PropTypes from 'prop-types'
import './task-filter.css'

export default function TaskFilter({ onFilterChange, filter }) {
  return (
    <ul className="filters">
      <li>
        <button type="button" className={filter === 'all' && 'selected'} onClick={() => onFilterChange('all')}>
          All
        </button>
      </li>
      <li>
        <button type="button" className={filter === 'active' && 'selected'} onClick={() => onFilterChange('active')}>
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'completed' && 'selected'}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilter.defaultProps = {
  onFilterChange: () => {},
  filter: 'all',
}

TaskFilter.propTypes = {
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
}
