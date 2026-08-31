import React, { useState, useEffect } from 'react';
import { X, Calendar, Tag, AlertCircle, Sparkles, Plus, Trash2 } from 'lucide-react';

export default function TaskModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null 
}) {
  const defaultDueDate = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: defaultDueDate,
    priority: 'Medium',
    category: 'Work',
    isImportant: false,
    subtasks: []
  });

  const [newSubtaskInput, setNewSubtaskInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        dueDate: initialData.dueDate || defaultDueDate,
        priority: initialData.priority || 'Medium',
        category: initialData.category || 'Work',
        isImportant: initialData.isImportant || false,
        subtasks: initialData.subtasks || []
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: defaultDueDate,
        priority: 'Medium',
        category: 'Work',
        isImportant: false,
        subtasks: []
      });
    }
    setNewSubtaskInput('');
    setErrors({});
  }, [initialData, isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (newSubtaskInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        subtasks: [
          ...prev.subtasks,
          { id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`, title: newSubtaskInput.trim(), completed: false }
        ]
      }));
      setNewSubtaskInput('');
    }
  };

  const handleRemoveSubtask = (subId) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((s) => s.id !== subId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setErrors({ title: 'Task title is required' });
      return;
    }

    onSave({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim()
    });

    onClose();
  };

  const categories = ['Work', 'Study', 'Personal'];
  const priorities = ['Low', 'Medium', 'High'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs animate-backdrop"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden animate-modal z-10 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {initialData ? 'Edit Task' : 'Add New Task'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* Task Title Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400 mb-1.5">
              Task Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Design homepage layout"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({});
              }}
              className={`w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-slate-800/60 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 transition-all ${
                errors.title
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-gray-200 dark:border-slate-700/80 focus:border-indigo-500 dark:focus:border-indigo-500'
              }`}
              autoFocus
            />
            {errors.title && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400 mb-1.5">
              Description <span className="text-gray-400 font-normal lowercase">(optional)</span>
            </label>
            <textarea
              rows={2}
              placeholder="Add details, notes or instructions..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/80 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all resize-none"
            />
          </div>

          {/* Subtasks Section */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400 mb-1.5">
              Subtasks Checklist
            </label>
            
            {/* Existing Subtask list */}
            {formData.subtasks.length > 0 && (
              <div className="space-y-1.5 mb-2.5">
                {formData.subtasks.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between bg-gray-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg text-xs">
                    <span className="text-gray-800 dark:text-slate-200 font-medium">{sub.title}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubtask(sub.id)}
                      className="text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add subtask input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add subtask item..."
                value={newSubtaskInput}
                onChange={(e) => setNewSubtaskInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/80 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300 hover:bg-indigo-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>
          </div>

          {/* Due Date & Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Due Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400 mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/80 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400 mb-1.5">
                Category
              </label>
              <div className="flex rounded-xl bg-gray-100 dark:bg-slate-800 p-1 gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      formData.category === cat
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                        : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Priority Pill Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400 mb-1.5">
              Priority
            </label>
            <div className="grid grid-cols-3 gap-2">
              {priorities.map((pri) => {
                const isSelected = formData.priority === pri;
                let activeClass = '';
                if (pri === 'Low') activeClass = 'border-slate-500 text-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-slate-200';
                if (pri === 'Medium') activeClass = 'border-amber-500 text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300';
                if (pri === 'High') activeClass = 'border-rose-500 text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300';

                return (
                  <button
                    key={pri}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: pri })}
                    className={`py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      isSelected
                        ? `${activeClass} ring-2 ring-indigo-500/20`
                        : 'border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {pri}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Important Checkbox Option */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isImportant"
              checked={formData.isImportant}
              onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 dark:border-slate-700 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="isImportant" className="text-xs font-semibold text-gray-700 dark:text-slate-300 cursor-pointer">
              Mark as ⭐ Important Task
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all"
            >
              {initialData ? 'Save Changes' : 'Add Task'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
