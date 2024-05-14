import { useEffect } from 'react';

function Form(props) {
  let buttonText = !props.isEditing ? 'Add Task' : 'Update';
  const editTaskId = props.editTaskId;

  useEffect(() => {
    if (editTaskId !== null) {
      document.querySelector('.text-input').focus();
    }
  }, [editTaskId]);

  const formatDate = (date) => {
    const options = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-CA', options);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(event.target.taskk.value.trim() !== '') { 
      const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      if(!props.isEditing) {
        const newTask = {
          title: event.target.taskk.value,
          date: formatDate(new Date()),
          id: Date.now(),
          complete: false
        };
        const updatedTasks = [newTask, ...existingTasks];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        props.updateTasks(updatedTasks);
      }
      else {
        const updatedTasks = existingTasks.filter(task => {
          if (task.id === editTaskId) {
            task.title = event.target.taskk.value;
            task.date = formatDate(new Date());
          }
          return true;
        });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        document.querySelector('.text-input').blur();
        props.updateTasks(updatedTasks);
        props.changeEdit();
      }
    }
    event.target.taskk.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        className='text-input'
        name='taskk'
        placeholder={!props.isEditing ? 'My new task' : 'Update task'} 
      />
      <input type="submit" className="add-task" value={buttonText} />
    </form>
  );
}

export default Form;