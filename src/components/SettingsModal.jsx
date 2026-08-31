import React, { useState } from 'react';
import { X, Settings, User, RotateCcw, Trash2, Database, Check } from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  userName,
  setUserName,
  onResetToDefaults,
  onClearAllData,
  taskCount
}) {
  const [nameInput, setNameInput] = useState(userName);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setUserName(nameInput.trim());
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs animate-backdrop"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden animate-modal z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Settings className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Application Settings
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* User Profile Section */}
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400">
              User Profile Name
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your name..."
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : 'Save'}
              </button>
            </div>
            {savedSuccess && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                Profile updated successfully!
              </p>
            )}
          </form>

          {/* Storage & Data Section */}
          <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-slate-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400">
              Data & Persistence
            </label>

            <div className="bg-gray-50 dark:bg-slate-800/60 p-3 rounded-xl flex items-center justify-between text-xs text-gray-600 dark:text-slate-300">
              <span className="flex items-center gap-2 font-medium">
                <Database className="w-4 h-4 text-indigo-500" />
                Saved Tasks Count:
              </span>
              <span className="font-bold text-gray-900 dark:text-white">{taskCount} tasks</span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset tasks back to initial demonstration sample data?')) {
                    onResetToDefaults();
                    onClose();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Sample Demo Data
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete all stored tasks? This action cannot be undone.')) {
                    onClearAllData();
                    onClose();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All Local Storage Tasks
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-slate-800/40 px-6 py-3 border-t border-gray-100 dark:border-slate-800/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
