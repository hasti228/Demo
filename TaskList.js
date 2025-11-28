import { useState } from 'react';
export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <ul style={{ marginTop: "30px", padding: "0", listStyle: "none" }}>
      {tasks.map(task => (
        <li key={task.id} style={{ marginBottom: "10px" }}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}
function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          style={{
            width: "70%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "3px solid #9f5050ff"
          }}
          value={task.text}
          onChange={(e) => {
            const val = e.target.value;
            const onlyChars = /^[A-Za-z ]*$/;

            if (onlyChars.test(val)) {
              onChange({ ...task, text: val });
            }
          }}
        />
        <button type="button" onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <div style={{ marginLeft: "1px" }}>
        {task.text}
      </div>
    );
  }
  return (
    <label>
      <div
        style={{
          background: "#EDDADA",
          padding: "10px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "space-between"
        }}
      >
        <input
          style={{ width: "15px", height: "15px" }}
          type="checkbox"
          checked={task.done}
          onChange={(e) => onChange({ ...task, done: e.target.checked })}
        />
        <span
          style={{
            textDecoration: task.done ? "line-through" : "none",
            color: task.done ? "#8a8a8a" : "#222",
          }}
        >
          {taskContent}
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            style={{
              background: "#8b5cf6",
              color: "white",
              border: "none",
              borderradius: "4px",
              padding: "3px",
              height: "35px",
              weidth: "35px",
              cursor: "pointer"
            }}
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            type="button"
            style={{
              background: "red",
              color: "white",
              border: "none",
              borderradius: "4px",
              padding: "3px",
              cursor: "pointer"
            }}
          >
            🗑️
          </button>
        </div>
      </div>
    </label>
  );
}
