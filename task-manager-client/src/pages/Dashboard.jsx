import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Task from './Task';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [title, setTitle] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editingTask) {
        await axios.put(
          `http://localhost:5000/api/tasks/${editingTask._id}`,
          { title },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditingTask(null);
      } else {
        await axios.post(
          'http://localhost:5000/api/tasks',
          { title },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setTitle('');
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch {
      setError('Could not delete task');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch {
      setError('Could not update task');
    }
  };

  useEffect(() => {
    let filtered = [...tasks];

    if (filter === 'completed') {
      filtered = filtered.filter((task) => task.completed);
    } else if (filter === 'incomplete') {
      filtered = filtered.filter((task) => !task.completed);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      return sortOrder === 'newest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

    setFilteredTasks(filtered);
  }, [tasks, filter, sortOrder, searchQuery]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, []);

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditingTask(task);
  };

  return (
    <div className="dashboard">
      <h2>🗂️ Dashboard</h2>
      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="filters">
        <label>Filter: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>

        <label>Sort: </label>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <form onSubmit={handleCreateOrUpdate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
        <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
      </form>

      <button
        onClick={() => {
          document.body.classList.toggle('dark-mode');
        }}
        className="dark-toggle"
      >
        🌓 Toggle Dark Mode
      </button>

      <ul>
        {filteredTasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onToggle={handleToggleComplete}
            onDelete={handleDelete}
            onEdit={handleEdit}
            searchQuery={searchQuery}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;








