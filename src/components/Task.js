import { FaCheckSquare, FaPen, FaTrash } from 'react-icons/fa';

function Task(props) {
  return (
    <div key={props.id} className={`task flex sb ${props.complete ? 'green' : 'blue'}`}>
      <div>
        <h2 className={props.complete ? 'opacity-half' : ''}>{props.title}</h2>
        <p>{props.date}</p>
      </div>
      <div className="icons">
        <FaCheckSquare
          className='icon fa-check'
          onClick={props.updateComplete}
        />
        <FaPen
          className='icon fa-pen'
          onClick={() => { props.changeEdit(); props.setId(props.id); }}
        />
        <FaTrash
          className='icon fa-trash'
          onClick={props.delete}
        />
      </div>
    </div>
  );
}

export default Task;