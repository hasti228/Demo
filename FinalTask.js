import { useReducer, useState } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
export default function FinalTask() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [filter, setFilter] = useState('all');

  const pendingCount = tasks.filter((t) => !t.done).length;
  const completedCount = tasks.filter((t) => t.done).length;

  function handleAddTask(text){
     if (typeof nextId !== 'number' || Number.isNaN(nextId)) nextId = 1;
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  const displayedTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.done;
    if (filter === 'completed') return t.done;
    return true; 
  });
console.log('===>> tasks', tasks)

  return (
    <>
      <div
        style={{
          backgroundColor: "#A4989C",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px"
        }}
      >
        <div
          style={{
            background: "#A4989C",
            width: "500px",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "3px 4px 20px rgba(83,47,47,0.87)"
          }}
        >
          <h2
            style={{
              marginBottom: "10px",
              color: "black",
              fontFamily: 'Brush Script MT',
              fontSize: "40px",
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "8px"
            }}
          >
            Todo App
          </h2>
          <br />
          <AddTask
            onAddTask={handleAddTask}
            tasks={tasks}
          />
          <div style={{ width: "100%", textAlign: "center", marginTop: 8 }}>
            <p style={{ margin: "4px 0" }}>You have {pendingCount} pending tasks</p>
            <p style={{ margin: "4px 0" }}>You have {completedCount} complete tasks</p>
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8
              }}
            >
              <label
                htmlFor="task-filter"
                style={{ fontWeight: 'bold', color: '#5b3b3b' }}
              >
                Show:
              </label>
               <select
                id="task-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: "2px solid #e6cfcf",
                  background: "#FFF",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select> 
              
            </div>
            <br />
            <button
              type="button"
              onClick={() => {
                if (!tasks || tasks.length === 0) return;
                tasks.forEach(t => dispatch({ type: 'deleted', id: t.id }));
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
            >
              Clear
            </button>
          </div>
          <TaskList
            tasks={displayedTasks}
            onChangeTask={handleChangeTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </>
  );
}
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ];
    }
    case 'changed': {
      return tasks.map(t =>
        t.id === action.task.id ? action.task : t
      );
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
let nextId = 3;
const initialTasks = [];
