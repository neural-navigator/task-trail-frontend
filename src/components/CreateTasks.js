import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const CreateTasks = () => {

    const auth = useAuth();

    const [task, setTask] = useState({
        title: '',
        description: '',
        category: '',
        token: '',
        rewardType: '',
        rewardAmount: '',
        numGigs: '',
        lifetime: '',
        refLink: '',
        taskType: ''
    })

    if (!auth.user.sessionToken) {
        return {error: "token not present"}
    }

    const headers = {
        headers: {
            Authorization: `Bearer ${auth.user.sessionToken}`
        }
    }

    const handleSubmit = async(category) => {
        const newTask = {...task, category}
        const response = await axios.post("http://localhost:4001/api/v1/create-task", newTask, headers)
        console.log(response);
    }
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask( prevUser => ({
            ...prevUser,
            [name]: value
        }))
    }

    const showInputAmount = () => {
        return task.rewardType === "cash" || task.rewardType === "amazonCoupon"
    }

  return (
    <div>
      Create a new Task
      <form>
        <label>
            Title: <input type="text" id="title" name="title" value={task.title} onChange={handleChange} />
        </label>
        <label>
            Description: <textarea id="description" name="description"  value={task.description} onChange={handleChange} />
        </label>
        <label>
            Token(time taken in hour minimum 1): <input type="number" id="token" name="token" value={task.token} onChange={handleChange} /> 
        </label>
        <label>
            Reward Type: <select name="rewardType" id="rewardType" value={task.rewardType} onChange={handleChange}>
                <option value="">Reward Type</option>
                <option value="cash">Cash</option>
                <option value="amazonCoupon">Amazon Coupon</option>
                <option value="communityHoF">Community Hall of Fame</option>
            </select>
        </label>
        
    {
        showInputAmount() && (
            <label> 
                Amount: <input type="number" id="rewardAmount" name="rewardAmount" value={task.rewardAmount} onChange={handleChange} />
            </label>
        )
    }

    <label>
        Reference Links: <input type="text" id="refLink" name="refLink" value={task.refLink} onChange={handleChange} />
    </label>

    <label>
        Number of gigs: <input type="number" id="numGigs" name="numGigs" value={task.numGigs} onChange={handleChange} />
    </label>

    <label>
        Task lifetime: <input type="number" id="lifetime" name="lifetime" value={task.lifetime} onChange={handleChange} />
    </label>

    <label>
            Task Type: <select name="taskType" value={task.taskType} onChange={handleChange}>
                <option value="">Task Type</option>
                <option value="tech">Tech</option>
                <option value="nonTech">Non Tech</option>
                <option value="other">Others</option>
            </select>
        </label>
        <button type="button" onClick={() => handleSubmit('draft')}>Save Draft</button>
        <button type="button" onClick={() => handleSubmit('published')}>Publish</button>
      </form>
    </div>
  )
}

export default CreateTasks;
