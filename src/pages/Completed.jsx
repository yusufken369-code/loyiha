import React from 'react';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { CheckCircle2, Trash2 } from 'lucide-react';

export default function Completed({
  tasks,
  onToggleComplete,
  onToggleImportant,
  onToggleSubtask,
  onEditTask,
  onDeleteTask,
  onClearCompleted,
  onOpenModal
}) {
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            Completed Tasks ({completedTasks.length})
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            Great job! Here are all the tasks you've accomplished so far.
          </p>
        </div>

        {completedTasks.length > 0 && (
          <button
            onClick={onClearCompleted}
            className="flex items-center justify-center gap-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Completed</span>
          </button>
        )}
      </div>

      {/* Task List or Empty State */}
      {completedTasks.length === 0 ? (
        <EmptyState
          onOpenModal={onOpenModal}
          customTitle="No completed tasks yet 🎯"
          customSub="Finish your active tasks and mark them as complete to see them listed here!"
        />
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onToggleImportant={onToggleImportant}
              onToggleSubtask={onToggleSubtask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}

    </div>
  );
}
