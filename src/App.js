import React, { useState } from 'react';
import './App.css';
import { Plus, Trash2 } from 'lucide-react';

function KidsTaskBoard() {
  const [kids, setKids] = useState([
    { name: 'Add Name', tasks: [], newTask: '' },
  ]);

  const handleNameChange = (index, newName) => {
    const updated = [...kids];
    updated[index].name = newName;
    setKids(updated);
  };

  const handleNewTaskChange = (index, value) => {
    const updated = [...kids];
    updated[index].newTask = value;
    setKids(updated);
  };

  const addTask = (index) => {
    const updated = [...kids];
    if (updated[index].newTask.trim()) {
      updated[index].tasks.push({ text: updated[index].newTask, done: false });
      updated[index].newTask = '';
      setKids(updated);
    }
  };

  const toggleTask = (kidIndex, taskIndex) => {
    const updated = [...kids];
    updated[kidIndex].tasks[taskIndex].done = !updated[kidIndex].tasks[taskIndex].done;
    setKids(updated);
  };

  const deleteTask = (kidIndex, taskIndex) => {
    const updated = [...kids];
    updated[kidIndex].tasks.splice(taskIndex, 1);
    setKids(updated);
  };

  const addKid = () => {
    setKids([...kids, { name: 'Add Name', tasks: [], newTask: '' }]);
  };

  return (
    <div className="App">
      <h1 className="title">🎯 Family Task Board</h1>
      <div className="board">
        {kids.map((kid, index) => (
          <div className="card" key={index}>
            <input
              className="kid-name"
              value={kid.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
            <div className="tasks">
              {kid.tasks.map((task, tIndex) => (
                <div className="task" key={tIndex}>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(index, tIndex)}
                    />
                    <span className={task.done ? 'done' : ''}>{task.text}</span>
                  </label>
                  <button onClick={() => deleteTask(index, tIndex)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="task-input">
              <input
                placeholder="Add a task"
                value={kid.newTask}
                onChange={(e) => handleNewTaskChange(index, e.target.value)}
              />
              <button onClick={() => addTask(index)}>
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
        <button className="add-kid" onClick={addKid}>
          + Add Kid
        </button>
      </div>
    </div>
  );
}

export default KidsTaskBoard;
