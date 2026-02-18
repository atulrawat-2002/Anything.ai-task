import { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, task, onCancel }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onSubmit({ title, description, status, _id: task?._id });
    setTitle("");
    setDescription("");
    setStatus("pending");
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }} > 
      <input style={{
        padding: '10px'
      }} placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input style={{
        padding: '10px'
      }} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <select style={{
        padding: '10px'
      }} value={status} onChange={e => setStatus(e.target.value)}>
        <option style={{
          padding: '20px'
        }} value="pending">Pending</option>
        <option style={{
          padding: '10px'
        }} value="done">Done</option>
      </select>
      <button style={{
        padding: '8px'
      }} type="submit">{task ? "Update" : "Add"} Task</button>
      {onCancel && <button  style={{
        padding: '8px'
      }} type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
