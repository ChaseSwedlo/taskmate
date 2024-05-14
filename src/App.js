import Title from './components/Title';
import Form from './components/Form';
import Tasks from './components/Tasks';
import { useReducer, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const initialState = {
  taskArray: [],
  editTaskId: null,
  isEditing: false,
  title: 'Taskmate'
};

const types = {
  SET_TASKS: 'setTasks',
  SET_EDIT_TASK_ID: 'setEditTaskId',
  SET_IS_EDITING: 'setIsEditing',
  SET_TITLE: 'setTitle'
};

function reducer(state, action) {
  switch (action.type) {
    case types.SET_TASKS:
      return { ...state, taskArray: action.payload };
    case types.SET_EDIT_TASK_ID:
      return { ...state, editTaskId: action.payload };
    case types.SET_IS_EDITING:
      return { ...state, isEditing: action.payload };
    case types.SET_TITLE:
      return { ...state, title: action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateTitle = (tasks) => {
    let numOfTasks = tasks.filter(task => !task.complete).length;
    if(numOfTasks !== 0)
      return `Taskmate (${numOfTasks} tasks)`;
    else 
    return `Taskmate`;
  };

  const updateTasks = (updatedTasks) => {
    dispatch({ type: types.SET_TASKS, payload: updatedTasks });
    dispatch({ type: types.SET_TITLE, payload: updateTitle(updatedTasks) });
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      dispatch({ type: types.SET_TASKS, payload: storedTasks });
    if (storedTasks.length !== 0)
      dispatch({ type: types.SET_TITLE, payload: updateTitle(storedTasks) });
    }
  }, []);

  const updateEdit = () => {
    dispatch({ type: types.SET_IS_EDITING, payload: !state.isEditing });
  };

  const setEditTaskId = (id) => {
    dispatch({ type: types.SET_EDIT_TASK_ID, payload: id });
  };

  return (
    <>
    <Helmet>
      <title>{state.title}</title>
    </Helmet>
    <main>
      <div className="container">
        <Title title="Taskmate" />
        <Form 
          updateTasks={updateTasks} 
          isEditing={state.isEditing} 
          changeEdit={updateEdit} 
          editTaskId={state.editTaskId} 
        />
        <Tasks 
          tasks={state.taskArray} 
          updateTasks={updateTasks} 
          changeEdit={updateEdit} 
          setId={setEditTaskId}
        />
      </div>
    </main>
    </>
  );
}

export default App;