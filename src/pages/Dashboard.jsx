import React from 'react';
import StatsCard from '../components/StatsCard';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { Plus, Calendar, ArrowRight } from 'lucide-react';

export default function Dashboard({
  tasks,
  taskStats,
  onToggleComplete,
  onToggleImportant,
  onEditTask,
  onDeleteTask,
  onOpenModal,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
  searchQuery,
  setSearchQuery,
  onResetFilters,
  onNavigateToTab
}) {
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.dueDate === todayStr);

  return (
    <div className="space-y-6">
      
      {/* 3 Statistics Cards */}
      <StatsCard
        total={taskStats.total}
        completed={taskStats.completed}
        remaining={taskStats.remaining}
      />

      {/* Today's Tasks Banner / Highlight */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide uppercase text-indigo-200 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              Today's Overview
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">
              {todayTasks.length === 0 
                ? "No tasks scheduled for today!" 
                : `You have ${todayTasks.length} task${todayTasks.length === 1 ? '' : 's'} scheduled for today`}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 mt-1">
              Stay organized and accomplish your main priorities step by step.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenModal}
              className="flex items-center gap-2 bg-white text-indigo-950 hover:bg-indigo-50 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <FilterBar
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onResetFilters={onResetFilters}
      />

      {/* Task List Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Tasks ({tasks.length})
        </h3>
        {tasks.length > 0 && (
          <button
            onClick={() => onNavigateToTab('all')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Task Cards or Empty State */}
      {tasks.length === 0 ? (
        <EmptyState onOpenModal={onOpenModal} />
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onToggleImportant={onToggleImportant}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}

    </div>
  );
}
