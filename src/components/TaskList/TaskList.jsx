import * as Icon from 'react-feather';
import { Badge } from '../../assets/css/badge';

import { ResponsiveTable  } from '../../assets/css/responsiveTable';

export default function TaskList(props){

    function getCurrentTaskIndex(selectedTask){
        return props.taskDetails.findIndex(task => task.id === selectedTask.id);
    }
    function addNewTask(){
        props.setNewTask(true);
        props.setTaskForm({taskName : '', dueDate: '', status: '',id: null});
        props.setEditTask(false);
    }
    function updateTask(selectedTask){
        const taskIndex = props.taskDetails.findIndex(task => task.id === selectedTask.id);
        props.setNewTask(true);
        props.setEditTask(true);
        props.setTaskForm(props.taskDetails[taskIndex]);
    }
    function deleteTask(selectedTask){
        const taskIndex = getCurrentTaskIndex(selectedTask);
        props.setTaskDetailsData((taskDetails) => {
          props.taskDetails.splice(taskIndex,1);
          console.log(taskDetails);
          localStorage.setItem("taskDetails", JSON.stringify(props.taskDetails));
          return [...taskDetails];
        })
    }

    function markAsCompleted(selectedTask){
        const taskIndex = props.taskDetails.findIndex(task => task.id === selectedTask.id);
        props.setTaskDetailsData((taskDetails) => {
            taskDetails[taskIndex].status = 'completed';
            localStorage.setItem("taskDetails", JSON.stringify(props.taskDetails));
            return [...taskDetails];
        })
    }

    function sortByDate(){
        props.setSorted(isSorted => isSorted = !props.isSorted);

        props.setTaskDetailsData((taskDetails) => {
            taskDetails.sort(function (a, b) {
                if(props.isSorted){
                    return new Date(a.dueDate) - new Date(b.dueDate);
                }else{
                    return new Date(b.dueDate) - new Date(a.dueDate);
                }
                
            });
            return [...taskDetails];
        })
    }
      
    return(<>
        <div className='table_heading'>
          <h2 className='d-flex'>
            <span className='badge badge-light me-2'>
              <Icon.Box color='#D84B77' size={25} />
            </span> Task Manger
          </h2>
          <button type='button' className='btn btn-add' onClick={() => addNewTask()}>
            <Icon.Plus color='black' size={25} /> Add Task
          </button>
        </div>
        <ResponsiveTable>
            <thead>
              <tr>
                <td>Sr.NO</td>
                <td>TASK NAME</td>
                <td>DUE DATE <button type='button' onClick={() => sortByDate()} className='btn icon-btn'><Icon.Sliders size={15} /> </button></td>
                <td>STATUS</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {props.taskDetails.map((task, index) => (
                <tr key={task.id}>
                  <td data-label="Sr.NO"><span className={`status-${task.status}`}> 0000{index+1} </span></td>
                  <td data-label="TASK NAME">{task.taskName}</td>
                  <td data-label="DUE DATE">
                    <span title={task.dueDate} className='cursor-help d-flex'> 
                    <Icon.Calendar color='#BEC1C6' className='me-2' size={25} />  {task.dueDate} </span> 
                  </td>
                  <td data-label="STATUS">
                    <Badge status={task.status}>{task.status}</Badge>
                  </td>
                  <td data-label="Action">
                    <div>
                      <button className='btn icon-btn' title='Edit' onClick={() => updateTask(task)}>
                        <Icon.Edit color='#938AEA' size={25}  />
                      </button>
                      
                      <button className='btn icon-btn' title='delete' onClick={() => {if(window.confirm('Delete the item?')){deleteTask(task)};}}>
                        <Icon.Delete color='#D84B77' size={25} />
                      </button>

                      <button className='btn icon-btn' title={task.status !== "completed" ? "Mark as Completed" : ''} disabled={task.status === "completed"} onClick={() => markAsCompleted(task)}>
                        {
                        task.status === "completed" ? 
                          <Icon.CheckCircle color='#57DA6F' size={25} /> : 
                          <Icon.Check color='#F7C945' size={25} />
                        }
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
        </ResponsiveTable>
    </>);
}