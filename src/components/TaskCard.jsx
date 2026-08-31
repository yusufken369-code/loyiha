import React, { useState } from 'react';
import { 
  Check, 
  Calendar, 
  Pencil, 
  Trash2, 
  Star, 
  Tag, 
  AlertCircle,
  CheckSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function TaskCard({ 
  task, 
  onToggleComplete, 
  onToggleImportant, 
  onToggleSubtask,
  onEdit, 
  onDelete 
}) {
  const { id, title, description, dueDate, priority, category, completed, isImportant, subtasks = [] } = task;
  const [showSubtasks, setShowSubtasks] = useState(false);

  // Subtask statistics calculation
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter(s => s.completed).length;

  // Category styling map
  const categoryStyles = {
    Work: 'bg-indigo-50 text-indigo-700 border-indigo-200/60 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/40',
    Study: 'bg-purple-50 text-purple-700 border-purple-200/60 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/40',
    Personal: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/40'
  };

  // Priority styling map
  const priorityStyles = {
    Low: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
    High: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
  };

  // Due date status calculation
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const todayStr = new Date().toISOString().split('T')[0];
    if (dateString === todayStr) return { text: 'Today', isToday: true, isOverdue: false };

    const dateObj = new Date(dateString);
    const todayObj = new Date(todayStr);
    const isOverdue = dateObj < todayObj && !completed;

    return {
      text: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isToday: false,
      isOverdue
    };
  };

  const dateInfo = formatDate(dueDate);

  return (
    <div
      className={`group bg-white dark:bg-slate-900 border rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-xs hover:shadow-md ${
        completed
          ? 'border-gray-100 dark:border-slate-800/60 opacity-80 bg-gray-50/50 dark:bg-slate-900/40'
          : 'border-gray-100 dark:border-slate-800/90 hover:border-gray-200 dark:hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        
        {/* Checkbox and Title/Description */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          
          {/* Custom Checkbox */}
          <button
            onClick={() => onToggleComplete(id)}
            className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-all duration-200 shrink-0 ${
              completed
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs scale-105'
                : 'border-gray-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 bg-white dark:bg-slate-800'
            }`}
            aria-label={completed ? "Mark task incomplete" : "Mark task complete"}
          >
            {completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          {/* Task Main Content */}
          <div className="flex-1 min-w-0">
            <h4
              className={`text-base font-semibold transition-all duration-200 break-words ${
                completed
                  ? 'line-through text-gray-400 dark:text-slate-500'
                  : 'text-gray-900 dark:text-slate-100'
              }`}
            >
              {title}
            </h4>

            {description && (
              <p
                className={`text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed ${
                  completed ? 'text-gray-400 dark:text-slate-600' : 'text-gray-500 dark:text-slate-400'
                }`}
              >
                {description}
              </p>
            )}

            {/* Badges & Date Footer */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              
              {/* Category Badge */}
              <span
                className={`px-2.5 py-1 rounded-md font-medium border text-[11px] flex items-center gap-1 ${
                  categoryStyles[category] || categoryStyles.Personal
                }`}
              >
                <Tag className="w-3 h-3" />
                {category}
              </span>

              {/* Priority Badge */}
              <span
                className={`px-2.5 py-1 rounded-md font-semibold text-[11px] ${
                  priorityStyles[priority] || priorityStyles.Low
                }`}
              >
                {priority} Priority
              </span>

              {/* Due Date Badge */}
              {dateInfo && (
                <span
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium ${
                    dateInfo.isOverdue
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 font-semibold'
                      : dateInfo.isToday
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 font-semibold'
                      : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {dateInfo.isOverdue ? (
                    <AlertCircle className="w-3 h-3 text-rose-500" />
                  ) : (
                    <Calendar className="w-3 h-3" />
                  )}
                  {dateInfo.text}
                </span>
              )}

              {/* Subtasks Progress Badge Toggle */}
              {totalSubtasks > 0 && (
                <button
                  onClick={() => setShowSubtasks(!showSubtasks)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 hover:bg-indigo-100 transition-colors"
                >
                  <CheckSquare className="w-3 h-3" />
                  <span>{completedSubtasks}/{totalSubtasks} subtasks</span>
                  {showSubtasks ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              )}

            </div>

            {/* Expandable Subtasks Checklist */}
            {totalSubtasks > 0 && showSubtasks && (
              <div className="mt-3.5 pt-3 border-t border-gray-100 dark:border-slate-800/80 space-y-2">
                {subtasks.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => onToggleSubtask && onToggleSubtask(id, sub.id)}
                    className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                        sub.completed
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                      }`}
                    >
                      {sub.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span className={sub.completed ? 'line-through text-gray-400 dark:text-slate-500' : ''}>
                      {sub.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity">
          
          {/* Important Star Toggle */}
          <button
            onClick={() => onToggleImportant && onToggleImportant(id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isImportant
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100'
                : 'text-gray-300 dark:text-slate-600 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
            title={isImportant ? "Remove from Important" : "Mark as Important"}
          >
            <Star className={`w-4 h-4 ${isImportant ? 'fill-amber-500' : ''}`} />
          </button>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
            title="Edit Task"
          >
            <Pencil className="w-4 h-4" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(id)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
}
