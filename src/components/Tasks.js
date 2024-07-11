import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthProvider';


const Tasks = () => {

  const [tasks, setTasks] = useState([]);
  const [expansion, setExpansion] = useState(false);
  const [taskType, setTaskType] = useState('allTasks');
  const auth = useAuth();

  const handleClick = (tab) => {
    setTaskType(tab)
  }

  const headers = {
    headers: {
      Authorization: `Bearer ${auth.user.sessionToken}`
    }
  }
  
  useEffect(() => {

    const fetchData = async() => {
    // change the payload if the user is searching for drafts and created by user
    if (taskType === "draft" || taskType === "active") {
    
    const payload = {
      userFilterRequired: true,
      taskType,
      filter: {},
      selectedFields: 'title'
    }

    try {
      console.log(`headers is ${JSON.stringify(headers)}`);
      const response = await axios.post("http://localhost:4001/api/v1/get-task", payload, headers);
      setTasks(response.data.tasks);
      console.log(response);
    } catch(error) {
      console.log(`error occurs ${error}`);
    }
  }

  else if (taskType === "participation" || taskType === "saved") {
      const payload = {
        taskType
      }
      const response = await axios.post("http://localhost:4001/api/v1/get-user-tasks", payload, headers);
      setTasks(response.data.tasks)
  }
}

  fetchData();

  }, []);

  const saveTask = async(taskId, category) => {
      const headers = {
        headers: {
          Authorization: `Bearer ${auth.user.sessionToken}`
        }
      }
      const body = {taskId, category}

      try {
        const response = await axios.post("http://localhost:4001/api/v1/save-task", body, headers);
        console.log(response);
      } catch (error) {
          console.log(`Error :: ${error}`)
      }
  }

  return (
    <div>
      All tasks Here
      <div onClick={() => handleClick("createTask")}>
          Create Task
      </div>
      <div onClick={() => handleClick("createTask")}>
          Create Task
      </div>
      <div onClick={() => handleClick("createTask")}>
          Create Task
      </div>
      {/* <Link to="create-task">Create Task</Link>
      <Link to="draft-tasks">Your Drafts</Link>
      <Link to="active-tasks">Created By You</Link>
      <Link to="participated-tasks">Participated</Link>
      <Link to="saved-tasks">Saved</Link>
      <Link to="expired-tasks">Expired</Link> */}
      <div>
        <h1>All tasks</h1>
        {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (

            

            <li key={task._id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>{task.category}</p>

              
              <button onClick={() => saveTask(task._id, 'saved')}>Save</button>
              <button onClick={() => saveTask(task._id, 'participation')}>Participate</button>
            </li>
            
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
      </div>
      
    </div>
  )
}

export default Tasks

