import React from 'react';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { Plus, ListTodo } from 'lucide-react';

export default function Tasks({
  tasks,
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
  onResetFilters
}) {
  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <ListTodo className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            All Tasks
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            Manage, filter, and track all your ongoing and completed work.
          </p>
        </div>

        <button
          onClick={onOpenModal}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filter Bar */}
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

      {/* Task List or Empty State */}
      {tasks.length === 0 ? (
        <EmptyState
          onOpenModal={onOpenModal}
          customTitle="No tasks found matching your filters 🔍"
          customSub="Try adjusting your search query, status, category, or priority filters."
        />
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
