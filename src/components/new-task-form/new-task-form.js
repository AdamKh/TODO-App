import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    label: ''
  }

  render() {
    const { addItem } = this.props;

    const onSubmidHandler = (e) => {
      e.preventDefault();
      (this.state.label != '') && addItem(this.state.label);
      this.setState({label: ''});
    }
  
    const inputChangeHandler = (e) => {
      this.setState({label: e.target.value});
    }
  
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={onSubmidHandler}>
          <input
            className="new-todo" 
            placeholder="What needs to be done?" 
            onChange={inputChangeHandler} 
            value={this.state.label} 
            autoFocus/>
        </form>
      </header>
    );
  }
}
