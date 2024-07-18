import React from 'react';
import './app.css'
import NewTaskForm from '../new-task-form'
import TaskList from '../task-list';
import Footer from '../footer';

const App = () => {
  return (
    <section className='todoapp'>
      <NewTaskForm />
      <section className='main'>
        <TaskList />
        <Footer />
      </section>
    </section>
  );
}

export default App;