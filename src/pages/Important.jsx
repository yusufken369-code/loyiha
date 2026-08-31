import React from 'react';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { Star, Plus } from 'lucide-react';

export default function Important({
  tasks,
  onToggleComplete,
  onToggleImportant,
  onEditTask,
  onDeleteTask,
  onOpenModal
}) {
  const importantTasks = tasks.filter(t => t.isImportant);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            Important Tasks ({importantTasks.length})
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            High priority items and starred tasks requiring special attention.
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

      {/* Task List or Empty State */}
      {importantTasks.length === 0 ? (
        <EmptyState
          onOpenModal={onOpenModal}
          customTitle="No starred tasks yet ⭐"
          customSub="Click the star icon on any task to pin it as an important task here."
        />
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {importantTasks.map((task) => (
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
