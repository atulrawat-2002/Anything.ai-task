import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // fetchTasks();
  }, []);

  const handleAddOrUpdate = async (taskData) => {
    try {
      if (taskData._id) {
        await API.put(`/tasks/${taskData._id}`, taskData);
      } else {
        await API.post("/tasks", taskData);
      }
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault()
    console.log("loggin out")
    localStorage.removeItem("token");
    
    navigate("/login");
  };

  return (
    <div style={{
      width:"100vw",
      height: '100vh',
      backgroundColor: 'cyan',
      display:'flex',
      flexDirection: 'column',
      gap: '20px',
      alignItems: 'center',
      padding: '30px'
    }} >
      <h2>Dashboard</h2>
      <button style={{
        width: '100px',
        padding: '8px'
      }} onClick={handleLogout}>Logout</button>
      <TaskForm onSubmit={handleAddOrUpdate} task={editingTask} onCancel={() => setEditingTask(null)} />
      <ul style={{
        listStyle: 'none',
        padding: '10px',
        
      }} >
        {tasks.map(task => (
          <li style={{
            border: '1px solid brown',
            padding: '10px',
            backgroundColor: 'whitesmoke',
            width: '200px',
            textAlign: 'center',

          }} key={task._id}>
            <h4 style={{
              
            }} >{task.title} ({task.status})</h4>
            <p>{task.description}</p>
            <button  style={{
              padding: '8px 10px 8px 10px',
              backgroundColor: 'red',
              marginInline: '15px',
              marginTop: '14px'
            }} onClick={() => setEditingTask(task)}>Edit</button>
            <button style={{
              padding: '8px 10px 8px 10px',
              backgroundColor: 'blue',
              marginInline: '15px',
              marginTop: '14px'
            }}  onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
