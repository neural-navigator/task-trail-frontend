import React from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const TaskViewer = (props) => {

    const auth = useAuth();
    const headers = {
        headers: {
            Authorization: `Bearer ${auth.user.sessionToken}`
        }
    }

    const clickHandler = async(taskId, category) => {
        const body = {taskId, category}

        try {
            console.log(headers);
            const res = await axios.post("http://localhost:4001/api/v1/save-task", body, headers)
            console.log(res);
        } catch (error) {
            console.log(`Error ::: ${error}`);
        }
    }

    const listitems = props.tasks.map((data) => <li>
        
        {data.title}, {data.description}
        <button onClick={() => {clickHandler(data._id, "saved")}}>Save</button>
        <button onClick={() => {clickHandler(data._id, "participation")}}>Participate</button>
    
    </li>);

  return (
    <div>
      { <ul>{listitems}</ul>}
      
    </div>
  )
}

export default TaskViewer
