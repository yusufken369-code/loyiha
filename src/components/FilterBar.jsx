import React from 'react';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';

export default function FilterBar({
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
  const categories = ['All', 'Work', 'Study', 'Personal'];
  const priorities = ['All', 'High', 'Medium', 'Low'];

  const hasActiveFilters = 
    statusFilter !== 'All' || 
    categoryFilter !== 'All' || 
    priorityFilter !== 'All' || 
    searchQuery.trim() !== '';

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-2xl p-3.5 sm:p-4 mb-6 shadow-xs space-y-3">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Status Filter Tabs (All, Active, Completed) */}
        <div className="flex bg-gray-100 dark:bg-slate-800/80 p-1 rounded-xl w-full md:w-auto">
          {['All', 'Active', 'Completed'].map((status) => {
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Search input for main view */}
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/70 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 rounded-xl focus:outline-none focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Category & Priority filter dropdowns */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-gray-100 dark:border-slate-800/60 text-xs">
        
        <div className="flex flex-wrap items-center gap-2">
          
          <span className="flex items-center gap-1 font-semibold text-gray-400 dark:text-slate-500 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters:
          </span>

          {/* Category Dropdown/Pills */}
          <div className="flex items-center gap-1">
            <span className="text-gray-500 dark:text-slate-400 font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Priority Dropdown/Pills */}
          <div className="flex items-center gap-1">
            <span className="text-gray-500 dark:text-slate-400 font-medium">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Reset Filter Button */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
          >
            <X className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        )}

      </div>

    </div>
  );
}
