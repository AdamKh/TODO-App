import { useState } from 'react'
import './app.css'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

export default function App() {
  const [taskListState, setTaskList] = useState([])
  const [filterState, setFilter] = useState('all')

  const onCheckClick = (id) => {
    setTaskList((taskList) => {
      const idx = taskList.findIndex((task) => task.id === id)

      const newArr = [
        ...taskList.slice(0, idx),
        { ...taskList[idx], completed: !taskList[idx].completed },
        ...taskList.slice(idx + 1),
      ]

      return newArr
    })
  }

  const onEditClick = (id) => {
    setTaskList((taskList) => {
      const idx = taskList.findIndex((task) => task.id === id)

      const newArr = [
        ...taskList.slice(0, idx),
        { ...taskList[idx], onEdit: !taskList[idx].onEdit },
        ...taskList.slice(idx + 1),
      ]

      return newArr
    })
  }

  const changeLabel = (id, label) => {
    setTaskList((taskList) => {
      const idx = taskList.findIndex((task) => task.id === id)

      const newArr = [...taskList.slice(0, idx), { ...taskList[idx], label, onEdit: false }, ...taskList.slice(idx + 1)]

      return newArr
    })
  }

  const onClearCompleted = () => {
    setTaskList((taskList) => {
      const newArr = taskList.filter((task) => !task.completed)
      return newArr
    })
  }

  const addItem = (label, timerMillisec) => {
    setTaskList((taskList) => {
      const key = Math.random().toString(36).slice(2)

      const newArr = [
        ...taskList,
        {
          label,
          completed: false,
          onEdit: false,
          id: key,
          created: new Date(),
          timerMillisec,
          visible: true,
        },
      ]

      return newArr
    })
  }

  const deleteItem = (id) => {
    setTaskList((taskList) => {
      const newArr = taskList.filter((task) => task.id !== id)
      return newArr
    })
  }

  const onFilterChange = (filter) => {
    setFilter(filter)
  }

  const taskFilter = (filter) => {
    switch (filter) {
      case 'all': {
        const arr = taskListState.map((task) => {
          const updatedTask = { ...task }
          updatedTask.visible = true
          return updatedTask
        })
        return arr
      }
      case 'active': {
        const arr = taskListState.map((task) => {
          const updatedTask = { ...task }
          if (updatedTask.completed) {
            updatedTask.visible = false
          } else {
            updatedTask.visible = true
          }
          return updatedTask
        })
        return arr
      }
      case 'completed': {
        const arr = taskListState.map((task) => {
          const updatedTask = { ...task }
          if (!updatedTask.completed) {
            updatedTask.visible = false
          } else {
            updatedTask.visible = true
          }
          return updatedTask
        })
        return arr
      }
      default:
        return taskListState
    }
  }

  const taskLeftCount = taskListState.filter((task) => !task.completed).length
  const visibleItems = taskFilter(filterState)

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <section className="main">
        <TaskList
          taskList={visibleItems}
          onDeleteClick={deleteItem}
          onEditClick={onEditClick}
          changeLabel={changeLabel}
          onCheckClick={onCheckClick}
        />
        <Footer
          taskLeftCount={taskLeftCount}
          onClearCompleted={onClearCompleted}
          onFilterChange={onFilterChange}
          filter={filterState}
        />
      </section>
    </section>
  )
}
