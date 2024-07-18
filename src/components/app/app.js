import React from 'react';
import './app.css'
import NewTaskForm from '../new-task-form'

const App = () => {
  return (
    <section className='todoapp'>
      <NewTaskForm />
    </section>
  );
}

export default App;