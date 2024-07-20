import React, { Component } from 'react';
import './app.css';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends Component {
  state = {
    taskList: [
      { label: 'Completed Task', completed: false, onEdit: false, id: 1 },
      { label: 'Editing task', completed: false, onEdit: false, id: 2 },
      { label: 'Active Task', completed: false, onEdit: false, id: 3 },
    ]
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

  deleteItem = (id) => {
    this.setState(({ taskList }) => {
      const idx = taskList.findIndex((task) => task.id === id);

      const newArr = [
        ...taskList.slice(0, idx), 
        ...taskList.slice(idx + 1)
      ];

      return {
        taskList: newArr
      };
    });
  }

  addItem = (label) => {
    console.log(label);
  }

  render() {
    const { taskList } = this.state;

    return (
      <section className='todoapp'>
        <NewTaskForm addItem = {this.addItem} />
        <section className='main'>
          <TaskList 
            taskList={taskList} 
            onDeleteClick={this.deleteItem} 
            onEditClick={this.onEditClick} 
            onCheckClick={this.onCheckClick} 
          />
          <Footer />
        </section>
      </section>
    );
  }
}
