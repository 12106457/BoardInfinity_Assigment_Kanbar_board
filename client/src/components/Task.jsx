import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'

const TaskColumn = ({ title, tasks, onStatusChange, onDeleteTask }) => {
  return (
    <div className="task-column card" style={{borderRadius:"20px 20px 20px 20px"}}>
      <div 
      style={{ background: (title === 'TODO') 
        ? '#8A30E5' : (title === 'IN PROGRESS') 
        ? '#FFC14E' : (title==="COMPLETED")
        ?"#06C270":"" ,
        borderRadius:'10px 10px 0px 0px' 
      }}>
       <h3 className='fs-5 p-2 text-center' style={{color:(title==='TODO'||title==='COMPLETED')?'white':''}}>{title}</h3>
      </div>

      {tasks.map(task => (
        <div key={task._id} className={` card m-3 shadow-sm p-3 custom-container ${title === 'TODO' ? 'Todo-task' : title === 'IN PROGRESS' ? 'Inprogress-task' : 'completed-task'}`} >
          <button className=' priority-btn shadow-sm' 
          style={{
            background:(task.priority==='HIGH')?'#FFECE1':(task.priority==='MEDIUM') ?'#FFECE1':(task.priority==='LOW')?'#F0FFDD':"",
            color:(task.priority==='HIGH')?'#FF5C00':(task.priority==='MEDIUM') ?'#FF00B8':(task.priority==='LOW')?'#8A8A8A':"",
            width:(task.priority==='MEDIUM')?"4rem":''
          }}>{task.priority}</button>



          <div className='title-description mt-3'>
          <div className='title-drop-down'>
          <h4 style={{font:'18px', color:'#0D062D'}}>{task.title}</h4>
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className='task-change-drop-down p-2'

          >
            <option value="" disabled>Change Status</option>
            <option value="TODO">TODO</option>
            <hr />
            <option value="IN_PROGRESS" >IN PROGRESS</option>
            <hr />
            <option value="COMPLETED">COMPLETED</option>
          </select>
          </div>

          <p style={{textAlign:'justify'}}>{task.description}</p>
          <hr />
          </div>
          
          <div className='d-flex justify-content-between'>
               <div><FontAwesomeIcon icon={faCalendarDay} /><span className='text-muted ms-2'>{task.date}</span></div>
                <div className=''> <button onClick={() => onDeleteTask(task._id)} className='rounded badge text-dark'>Delete</button></div>
          </div>
                   
        </div>
      ))}
    </div>
  );
};

export default TaskColumn;
