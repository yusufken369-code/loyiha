import React from 'react';
import { 
  LayoutDashboard, 
  ListTodo, 
  Star, 
  CheckCircle2, 
  Settings, 
  Sun, 
  Moon, 
  X,
  Sparkles
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  taskCounts,
  isOpen,
  onClose,
  darkMode,
  onToggleDarkMode,
  onOpenSettings
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      count: taskCounts.total,
      badgeColor: 'bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300'
    },
    {
      id: 'all',
      label: 'All Tasks',
      icon: ListTodo,
      count: taskCounts.total,
      badgeColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
    },
    {
      id: 'important',
      label: 'Important',
      icon: Star,
      count: taskCounts.important,
      badgeColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: CheckCircle2,
      count: taskCounts.completed,
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
    }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30 md:hidden animate-backdrop"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Section */}
        <div className="p-5">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Task<span className="text-indigo-600 dark:text-indigo-400">Flow</span>
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold -mt-1">
                  Productivity App
                </span>
              </div>
            </div>
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-2">
              Menu
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/60 hover:text-gray-900 dark:hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.id === 'important' ? 'text-amber-500' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badgeColor
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-800/80 space-y-1.5">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-2">
            Preferences
          </p>

          {/* Settings Button */}
          <button
            onClick={() => {
              if (onClose) onClose();
              if (onOpenSettings) onOpenSettings();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/60 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-500 dark:text-slate-400" />
            <span>Settings</span>
          </button>

          {/* Dark Mode Switch */}
          <button
            onClick={onToggleDarkMode}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/60 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="w-4 h-4 text-indigo-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
              <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </div>

            {/* Toggle Switch Graphic */}
            <div className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ${
              darkMode ? 'bg-indigo-600' : 'bg-gray-300'
            }`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                darkMode ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
