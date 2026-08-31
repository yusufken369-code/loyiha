import React from 'react';
import { ListTodo, CheckCircle2, Clock } from 'lucide-react';

export default function StatsCard({ total = 0, completed = 0, remaining = 0 }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const cards = [
    {
      title: 'Total Tasks',
      value: total,
      subtitle: 'All created tasks',
      icon: ListTodo,
      gradient: 'from-blue-500 to-indigo-600',
      bgLight: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
      borderColor: 'hover:border-indigo-200 dark:hover:border-indigo-800/50'
    },
    {
      title: 'Completed',
      value: completed,
      subtitle: `${percentage}% completed`,
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
      borderColor: 'hover:border-emerald-200 dark:hover:border-emerald-800/50'
    },
    {
      title: 'Remaining',
      value: remaining,
      subtitle: 'Pending action',
      icon: Clock,
      gradient: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
      borderColor: 'hover:border-amber-200 dark:hover:border-amber-800/50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 ${card.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-400">
                  {card.title}
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                  {card.value}
                </h3>
              </div>

              <div className={`w-11 h-11 rounded-2xl ${card.bgLight} flex items-center justify-center`}>
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>

            {/* Progress bar on Completed card */}
            {card.title === 'Completed' ? (
              <div className="mt-3">
                <div className="flex justify-between items-center text-xs mb-1 font-medium text-gray-500 dark:text-slate-400">
                  <span>Progress</span>
                  <span>{percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 font-medium">
                {card.subtitle}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
