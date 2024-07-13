import axios from 'axios';

const saveTask = async(body, headers) => {
    try {
      const response = await axios.post("http://localhost:4001/api/v1/save-task", body, headers);
      console.log(response);
    } catch (error) {
        console.log(`Error :: ${error}`)
    }
}


const userTasks = async(body, headers) => {
    try {
        const res = await axios.post("http://localhost:4001/api/v1/get-task", body, headers)
        return res
    } catch(error) {
        console.log(`Error occured :: ${error}`);
    }
}


const userParticipatedTasks = async(body, headers) => {
    try {
        const res = await axios.post("http://localhost:4001/api/v1//get-user-tasks", body, headers)
        return res
    } catch (error) {
        console.log(`Error occured :: ${error}`);
    }
}