import { useState } from 'react';

import './App.css';
import './assets/css/buttons.css';
import './assets/css/table.css';

import TaskList from './components/TaskList/TaskList';

function App() {

  const taskDetailsInfo = JSON.parse(localStorage.getItem("taskDetails")) || [];
  const [newTask, setNewTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [tasksForm, setTaskForm] = useState({ taskName : '', dueDate: '', status: '', id: null });
  const [isSorted, setSorted] = useState(false);

  const [taskDetailsData, setTaskDetailsData] = useState(taskDetailsInfo);


  function saveTaskDetails(taskId){
    setNewTask(false);
    setTaskDetailsData((taskDetailsData) => {
      if(editTask){
        const taskIndex = taskDetailsData.findIndex(task => task.id === taskId);
        taskDetailsData[taskIndex].taskName = tasksForm.taskName
        taskDetailsData[taskIndex].dueDate = tasksForm.dueDate
        taskDetailsData[taskIndex].status = tasksForm.status
        localStorage.setItem("taskDetails", JSON.stringify(taskDetailsData));
        return taskDetailsData;
      }
      const updateWithId = {...tasksForm, id: new Date().getTime()}
      localStorage.setItem("taskDetails", JSON.stringify([...taskDetailsInfo, updateWithId]));
      return [...taskDetailsData, updateWithId];
    });
    setTaskForm({taskName : '', dueDate: '', status: '',id: null});
  }

 
  return (
    <div  className='container-fluid'>
      <div className="row">
        <div className="col-12 col-sm-2">
          
        </div>
        <div className="col-12 col-sm" style={{backgroundColor: '#eceef1'}}>
        {newTask ?  <div className='form-container'>
          <h4>Add Task</h4>
          <form className='row g-3 mb-3 align-items-end' onSubmit={() => saveTaskDetails(tasksForm.id || null)}>
            <div className='mb-3 col-sm-3'>
              <label className='form-label' htmlFor='taskName'>Task Name</label>
              <input type='text' id='taskName' className='form-control' value={tasksForm.taskName}
                onChange={e => {
                  setTaskForm({
                    ...tasksForm,
                    taskName: e.target.value
                  });
                }}/>
            </div>
            <div className='mb-3 col-sm-3'>
              <label className='form-label' htmlFor='dueDate'>Due Date</label>
              <input type='date'  className='form-control'  id='dueDate'  value={tasksForm.dueDate}
                onChange={e => {
                  setTaskForm({
                    ...tasksForm,
                    dueDate: e.target.value
                  });
                }}/>
            </div>
            <div className='mb-3 col-sm-3'>
              <label className='form-label' htmlFor='taskStatus'>Status</label>
              <select  className='form-control' id='taskStatus' value={tasksForm.status} defaultValue="inprogress"
                onChange={e => {
                    setTaskForm({
                      ...tasksForm,
                      status: e.target.value
                    });
                  }}>
                  <option value="">-Select-</option>
                  <option value="inprogress">In Progress</option>
                  <option value="completed">completed</option>
                </select>
            </div>
            <div className='mb-3 col-sm-2'>
              <button type='submit' className='btn btn-outline-primary w-100'>
                {editTask ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div> : ''}

        <TaskList 
          taskDetails={taskDetailsData} 
          isNewTask={newTask}
          isSorted={isSorted}
          isEditTask={editTask}
          setSorted={setSorted}
          setEditTask={setEditTask}
          setNewTask={setNewTask} 
          setTaskForm={setTaskForm}
          setTaskDetailsData={setTaskDetailsData} />
        </div>
      </div>
      
    </div>
    
  );
}

export default App;
