import React from "react";

const TaskItem = ({ title, desc, isCompleted, updateBtn, deleteBtn, id }) => {
  return (
    <div className="todo">
      <div className="">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
      <div>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => updateBtn(id)}
        />
        <button className="btn" onClick={() => deleteBtn(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
