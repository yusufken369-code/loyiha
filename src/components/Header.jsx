import React from 'react';
import { Plus, Menu, Sun, Moon, Search } from 'lucide-react';

export default function Header({ 
  userName = 'Alex', 
  onOpenModal, 
  onToggleSidebar, 
  darkMode, 
  onToggleDarkMode,
  searchQuery,
  onSearchChange
}) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800/80 px-4 sm:px-6 py-3.5 transition-colors">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        
        {/* Left section: Mobile menu & Greeting */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              {getGreeting()}, <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">{userName}</span> 👋
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-medium">
              {currentDate}
            </p>
          </div>
        </div>

        {/* Right section: Search bar, Dark mode toggle, Add task button, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Search on Desktop Header */}
          <div className="hidden lg:flex items-center relative w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery || ''}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-gray-100 dark:bg-slate-800/80 text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 rounded-xl border border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
            />
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 sm:p-2.5 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400 transition-transform rotate-0 hover:rotate-45 duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700 transition-transform rotate-0 hover:-rotate-12 duration-300" />
            )}
          </button>

          {/* Large + Add Task Button */}
          <button
            onClick={onOpenModal}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-2 rounded-xl shadow-sm hover:shadow-indigo-500/25 transition-all duration-200"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Add Task</span>
          </button>

          {/* User Avatar */}
          <div className="relative group cursor-pointer">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-sm">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white font-bold text-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>

        </div>

      </div>
    </header>
  );
}
