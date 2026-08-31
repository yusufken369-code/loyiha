import React from 'react';
import { Plus, CheckCircle2, Sparkles, Inbox } from 'lucide-react';

export default function EmptyState({ onOpenModal, customTitle, customSub }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-dashed border-gray-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
      
      {/* Decorative Icon */}
      <div className="relative w-20 h-20 mx-auto mb-5">
        <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full animate-ping opacity-25" />
        <div className="relative w-full h-full bg-gradient-to-tr from-indigo-100 to-violet-100 dark:from-slate-800 dark:to-indigo-950/60 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/40">
          <Inbox className="w-10 h-10" />
        </div>
      </div>

      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
        {customTitle || "No tasks yet 🎉"}
      </h3>

      <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 max-w-xs mx-auto leading-relaxed font-medium">
        {customSub || "Create your first task and start being productive."}
      </p>

      <button
        onClick={onOpenModal}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-indigo-600/25 transition-all duration-200"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Create Task</span>
      </button>

    </div>
  );
}
