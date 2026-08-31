import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskModal from './components/TaskModal';
import SettingsModal from './components/SettingsModal';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Completed from './pages/Completed';
import Important from './pages/Important';
import { initialTasks } from './data/initialTasks';

export default function App() {
  // 1. Theme State & LocalStorage persistence
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('taskflow_theme');
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('taskflow_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('taskflow_theme', 'light');
    }
  }, [darkMode]);

  // 2. User Name State
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('taskflow_user') || 'Alex';
  });

  const handleUpdateUserName = (newName) => {
    setUserName(newName);
    localStorage.setItem('taskflow_user', newName);
  };

  // 3. Tasks State & LocalStorage persistence
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow_tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (e) {
        console.error('Failed to parse saved tasks:', e);
      }
    }
    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 4. Navigation & View State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // 5. Filters & Sorting State
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const handleResetFilters = () => {
    setStatusFilter('All');
    setCategoryFilter('All');
    setPriorityFilter('All');
    setSortBy('newest');
    setSearchQuery('');
  };

  // CRUD Operations
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t))
      );
      setEditingTask(null);
    } else {
      const newTask = {
        id: `task-${Date.now()}`,
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks((prev) => [newTask, ...prev]);
    }
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleToggleImportant = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isImportant: !t.isImportant } : t))
    );
  };

  const handleToggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const updatedSubtasks = (t.subtasks || []).map((sub) =>
          sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
        );
        return { ...t, subtasks: updatedSubtasks };
      })
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleResetToDefaults = () => {
    setTasks(initialTasks);
  };

  const handleClearAllData = () => {
    setTasks([]);
  };

  const handleImportTasks = (importedTasks) => {
    setTasks(importedTasks);
  };

  // Task stats calculation
  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const remaining = total - completed;
    const important = tasks.filter((t) => t.isImportant).length;
    return { total, completed, remaining, important };
  }, [tasks]);

  // Filter & Sort tasks dynamically
  const filteredTasks = useMemo(() => {
    let result = tasks.filter((task) => {
      // Status filter
      if (statusFilter === 'Active' && task.completed) return false;
      if (statusFilter === 'Completed' && !task.completed) return false;

      // Category filter
      if (categoryFilter !== 'All' && task.category !== categoryFilter) return false;

      // Priority filter
      if (priorityFilter !== 'All' && task.priority !== priorityFilter) return false;

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const titleMatch = task.title.toLowerCase().includes(query);
        const descMatch = task.description?.toLowerCase().includes(query) || false;
        if (!titleMatch && !descMatch) return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
      }
      if (sortBy === 'priority') {
        const priorityWeight = { High: 3, Medium: 2, Low: 1 };
        return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [tasks, statusFilter, categoryFilter, priorityFilter, sortBy, searchQuery]);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        taskCounts={taskStats}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <Header
          userName={userName}
          onOpenModal={handleOpenAddModal}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              tasks={filteredTasks}
              allTasks={tasks}
              taskStats={taskStats}
              onToggleComplete={handleToggleComplete}
              onToggleImportant={handleToggleImportant}
              onToggleSubtask={handleToggleSubtask}
              onEditTask={handleOpenEditModal}
              onDeleteTask={handleDeleteTask}
              onOpenModal={handleOpenAddModal}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onResetFilters={handleResetFilters}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'all' && (
            <Tasks
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onToggleImportant={handleToggleImportant}
              onToggleSubtask={handleToggleSubtask}
              onEditTask={handleOpenEditModal}
              onDeleteTask={handleDeleteTask}
              onOpenModal={handleOpenAddModal}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onResetFilters={handleResetFilters}
            />
          )}

          {activeTab === 'important' && (
            <Important
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onToggleImportant={handleToggleImportant}
              onToggleSubtask={handleToggleSubtask}
              onEditTask={handleOpenEditModal}
              onDeleteTask={handleDeleteTask}
              onOpenModal={handleOpenAddModal}
            />
          )}

          {activeTab === 'completed' && (
            <Completed
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onToggleImportant={handleToggleImportant}
              onToggleSubtask={handleToggleSubtask}
              onEditTask={handleOpenEditModal}
              onDeleteTask={handleDeleteTask}
              onClearCompleted={handleClearCompleted}
              onOpenModal={handleOpenAddModal}
            />
          )}
        </main>
      </div>

      {/* Task Modal (Add/Edit) */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        initialData={editingTask}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userName={userName}
        setUserName={handleUpdateUserName}
        onResetToDefaults={handleResetToDefaults}
        onClearAllData={handleClearAllData}
        tasks={tasks}
        onImportTasks={handleImportTasks}
      />

    </div>
  );
}
