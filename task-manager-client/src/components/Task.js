import React from 'react';
import './Task.css';
import { motion } from 'framer-motion';

const Task = ({ task, onToggle, onDelete, onEdit, searchQuery }) => {
  const getHighlightedTitle = () => {
    if (!searchQuery) return task.title;

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = task.title.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const getPriorityClass = (priority) => {
    if (!priority) return '';
    return `priority-${priority.toLowerCase()}`;
  };

  return (
    <motion.li
      className={`task-item ${task.completed ? 'completed' : ''}`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        onClick={() => onToggle(task)}
        className={`task-title ${task.completed ? 'strike' : ''}`}
        layout
        transition={{ duration: 0.2 }}
      >
        {getHighlightedTitle()}
      </motion.span>

      <div className="task-badges">
        {task.priority && (
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
        )}
        {task.dueDate && (
          <span className="due-date-badge">
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(task)}>✏️</button>
        <button onClick={() => onDelete(task._id)}>🗑️</button>
      </div>
    </motion.li>
  );
};

export default Task;

