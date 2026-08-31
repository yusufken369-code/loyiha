export const initialTasks = [
  {
    id: "task-1",
    title: "Design TaskFlow Dashboard UI Prototype",
    description: "Create modern SaaS layout mockups with dark mode support and responsive component guidelines.",
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    priority: "High",
    category: "Work",
    completed: false,
    isImportant: true,
    createdAt: new Date().toISOString(),
    subtasks: [
      { id: "sub-1", title: "Create Figma component library", completed: true },
      { id: "sub-2", title: "Setup color tokens for dark mode", completed: true },
      { id: "sub-3", title: "Test mobile drawer navigation UX", completed: false }
    ]
  },
  {
    id: "task-2",
    title: "Prepare for JavaScript React Technical Interview",
    description: "Review hooks, custom hooks, context API, performance optimization, and custom state managers.",
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
    priority: "Medium",
    category: "Study",
    completed: false,
    isImportant: true,
    createdAt: new Date().toISOString(),
    subtasks: [
      { id: "sub-4", title: "Practice useMemo & useCallback scenarios", completed: true },
      { id: "sub-5", title: "Solve 3 LeetCode array problems", completed: false }
    ]
  },
  {
    id: "task-3",
    title: "Weekly Grocery & Meal Prep Shopping",
    description: "Buy fresh organic vegetables, fruits, almond milk, sourdough bread, and green tea.",
    dueDate: new Date().toISOString().split('T')[0], // Today
    priority: "Low",
    category: "Personal",
    completed: true,
    isImportant: false,
    createdAt: new Date().toISOString(),
    subtasks: [
      { id: "sub-6", title: "Buy almond milk and avocados", completed: true },
      { id: "sub-7", title: "Pick up fresh sourdough bread", completed: true }
    ]
  },
  {
    id: "task-4",
    title: "Refactor Component State and LocalStorage Sync",
    description: "Ensure smooth state synchronization and persistence across browser refresh cycles.",
    dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    priority: "High",
    category: "Work",
    completed: false,
    isImportant: false,
    createdAt: new Date().toISOString(),
    subtasks: []
  },
  {
    id: "task-5",
    title: "Read Chapter 4 of Clean Code Architecture",
    description: "Take notes on modular software architecture, SOLID principles, and clean abstractions.",
    dueDate: new Date(Date.now() + 345600000).toISOString().split('T')[0],
    priority: "Low",
    category: "Study",
    completed: true,
    isImportant: false,
    createdAt: new Date().toISOString(),
    subtasks: []
  }
];
