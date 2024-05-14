import Task from './Task';

function Tasks(props) {
  const tasks = props.tasks;

  const updateComplete = (taskId) => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], complete: !updatedTasks[taskIndex].complete };
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    props.updateTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    props.updateTasks(updatedTasks);
  };

  return (
    <section className="grid">
      {
        tasks.map(task => (
        <Task 
          key={task.id} 
          id={task.id} 
          title={task.title} 
          date={task.date}
          complete={task.complete}
          delete={() => deleteTask(task.id)}
          changeEdit={props.changeEdit}
          setId={props.setId}
          updateComplete={() => updateComplete(task.id)}
        />
        ))
      }
    </section>
  );
}

export default Tasks;