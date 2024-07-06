import React from 'react'
import { Link } from 'react-router-dom'

const Tasks = () => {
  return (
    <div>
      <Link to="create-task">Create Task</Link>
      <Link to="draft-tasks">Drafts</Link>
      <Link to="active-tasks">Active</Link>
      <Link to="previous-tasks">Previous</Link>
    </div>
  )
}

export default Tasks
