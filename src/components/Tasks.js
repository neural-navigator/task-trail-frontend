import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthProvider';
import CreateTasks from './CreateTasks';
import TaskViewer from './TaskViewer';


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
      const response = await axios.post("http://localhost:4001/api/v1/get-task", payload, headers);
      if (response.status===200){
        setTasks(response.data.tasks);
      } else {
        setTasks([]);
      }
      
      console.log(response);
    } catch(error) {
      console.log(`error occurs ${error}`);
    }
  }

  else if (taskType === "participation" || taskType === "saved") {
      const payload = {
        taskType
      }
      try {
      const response = await axios.post("http://localhost:4001/api/v1/get-user-tasks", payload, headers);
      if (response.status === 200 || response.status === 404){
        console.log(`no tasks found`);
        setTasks(response.data.tasks)
      } else {
        setTasks([])
      }
    } catch(error) {
      console.log(`Error:: ${error}`);
    }
      
  }
}

  fetchData();

  }, [taskType, auth.user.sessionToken]);

  return (
    <div>
      <div onClick={() => handleClick("createTask")}>
          Create Task
      </div>
      <div onClick={() => handleClick("draft")}>
          Drafts
      </div>
      <div onClick={() => handleClick("active")}>
          Your Tasks
      </div>
      <div onClick={() => handleClick("participation")}>
          Participated
      </div>
      <div onClick={() => handleClick("saved")}>
          Saved
      </div>
      <div onClick={() => handleClick("expired")}>
          Expired
      </div>

      <div>
        {
          (taskType === "createTask") ? <CreateTasks /> : <TaskViewer tasks={tasks} />
        }
      </div>
      
    </div>
  )
}

export default Tasks

