import React from 'react';
import '@/styles/components/addTaskList.scss';

const AddTaskList = ({ onClick }) => {
  return (
    <div className="add-task-list" onClick={onClick}>
      <button className="add-list-button">+ Добавить список</button>
    </div>
  );
};

export default AddTaskList;
