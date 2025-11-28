import { useState } from 'react';
export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  const handleAdd = () => {
    if (text.trim() === "") return;
    onAddTask(text);
    setText('');
  };
  const onlyChars = /^[A-Za-z]/;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginTop: 18
      }}
    >
      <input
        placeholder="Add your new todo"
        value={text}
        onChange={(e) => {
          const val = e.target.value;
          if (onlyChars.test(val)) {
            setText(val);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "3px solid #9f5050ff"
        }}
      />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}
        style={{
          padding: "10px 16px",
          background: "#C36262",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
        type="button"> +
      </button>
    </div>
  );
}
