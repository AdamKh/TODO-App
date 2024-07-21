import React, { Component } from 'react';
import './app.css';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends Component {
  state = {
    taskList: [],
    filter: 'all'
  }

  onCheckClick = (id) => {
    this.setState(({ taskList }) => {
      const idx = taskList.findIndex((task) => task.id === id);

      const newArr = [
        ...taskList.slice(0, idx), 
        { ...taskList[idx], completed: !taskList[idx].completed }, 
        ...taskList.slice(idx + 1)
      ];

      return {
        taskList: newArr
      };
    });
  }

  onEditClick = (id) => {
    this.setState(({ taskList }) => {
      const idx = taskList.findIndex((task) => task.id === id);

      const newArr = [
        ...taskList.slice(0, idx), 
        { ...taskList[idx], onEdit: !taskList[idx].onEdit }, 
        ...taskList.slice(idx + 1)
      ];

      return {
        taskList: newArr
      };
    });
  }

  changeLabel = (id, label) => {
    this.setState(({ taskList }) => {
      const idx = taskList.findIndex((task) => task.id === id);

      const newArr = [
        ...taskList.slice(0, idx), 
        { ...taskList[idx], label: label, onEdit: false }, 
        ...taskList.slice(idx + 1)
      ];

      return {
        taskList: newArr
      };
    });
  }

  onClearCompleted = () => {
    const newArr = this.state.taskList.filter((task) => !task.completed);
    this.setState({taskList: newArr})
  }

  addItem = (label) => {
    this.setState(({ taskList }) => {
      const key = Math.random().toString(36).slice(2);

      const newArr = [
        ...taskList,
        { label: label, completed: false, onEdit: false, id: key, created: new Date()  }
      ];

      return {
        taskList: newArr
      };
    });
  }

  deleteItem = (id) => {
    this.setState(({ taskList }) => {
      const newArr = taskList.filter((task) => task.id !== id);
      return {
        taskList: newArr
      };
    });
  }
  
  filter = (filter, items) => {
    switch(filter) {
      case 'all' :
        return items;
      case 'active':
        return items.filter((item) => !item.completed)
      case 'completed':
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }

  onFilterChange = (filter) => {
    this.setState({filter: filter});
  }

  render() {
    const { taskList, filter } = this.state;
    const taskLeftCount = taskList.filter((task) => !task.completed).length;
    const visibleItems = this.filter(filter, taskList);

    return (
      <section className='todoapp'>
        <NewTaskForm addItem = {this.addItem} />
        <section className='main'>
          <TaskList 
            taskList={visibleItems} 
            onDeleteClick={this.deleteItem} 
            onEditClick={this.onEditClick}
            changeLabel={this.changeLabel}
            onCheckClick={this.onCheckClick}
          />
          <Footer 
            taskLeftCount={taskLeftCount}
            onClearCompleted={this.onClearCompleted}
            onFilterChange={this.onFilterChange}
            filter={filter}/>
        </section>
      </section>
    );
  }
}
