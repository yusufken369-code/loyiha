import React from 'react';
import StatsCard from '../components/StatsCard';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { Plus, Calendar, ArrowRight, PieChart, Briefcase, GraduationCap, User } from 'lucide-react';

export default function Dashboard({
  tasks,
  allTasks,
  taskStats,
  onToggleComplete,
  onToggleImportant,
  onToggleSubtask,
  onEditTask,
  onDeleteTask,
  onOpenModal,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  onResetFilters,
  onNavigateToTab
}) {
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = allTasks.filter(t => t.dueDate === todayStr);

  // Category Distribution Calculation
  const totalCount = allTasks.length || 1;
  const workCount = allTasks.filter(t => t.category === 'Work').length;
  const studyCount = allTasks.filter(t => t.category === 'Study').length;
  const personalCount = allTasks.filter(t => t.category === 'Personal').length;

  const workPct = Math.round((workCount / totalCount) * 100);
  const studyPct = Math.round((studyCount / totalCount) * 100);
  const personalPct = Math.round((personalCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      
      {/* 3 Statistics Cards */}
      <StatsCard
        total={taskStats.total}
        completed={taskStats.completed}
        remaining={taskStats.remaining}
      />

      {/* Today's Tasks & Category Breakdown Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Today's Tasks Banner */}
        <div className="lg:col-span-2 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
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

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-indigo-200 font-medium">
              {allTasks.filter(t => t.completed).length} of {allTasks.length} total tasks completed
            </span>
            <button
              onClick={onOpenModal}
              className="flex items-center gap-2 bg-white text-indigo-950 hover:bg-indigo-50 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Category Breakdown Widget */}
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 flex items-center gap-1.5">
                <PieChart className="w-4 h-4 text-indigo-500" />
                Category Distribution
              </h4>
              <span className="text-xs text-gray-400 font-semibold">{allTasks.length} Total</span>
            </div>

            {/* Combined Segmented Progress Bar */}
            <div className="w-full h-2.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden flex mb-4">
              <div style={{ width: `${workPct}%` }} className="bg-indigo-500 h-full" title={`Work: ${workPct}%`} />
              <div style={{ width: `${studyPct}%` }} className="bg-purple-500 h-full" title={`Study: ${studyPct}%`} />
              <div style={{ width: `${personalPct}%` }} className="bg-emerald-500 h-full" title={`Personal: ${personalPct}%`} />
            </div>

            {/* Category breakdown stats */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-slate-300">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-500" /> Work
                </span>
                <span className="font-bold text-gray-900 dark:text-white">{workCount} ({workPct}%)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-slate-300">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-500" /> Study
                </span>
                <span className="font-bold text-gray-900 dark:text-white">{studyCount} ({studyPct}%)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-slate-300">
                  <User className="w-3.5 h-3.5 text-emerald-500" /> Personal
                </span>
                <span className="font-bold text-gray-900 dark:text-white">{personalCount} ({personalPct}%)</span>
              </div>
            </div>
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
        sortBy={sortBy}
        setSortBy={setSortBy}
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
