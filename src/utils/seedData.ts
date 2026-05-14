import { useStore } from '@/store/useStore'

/**
 * 首次访问时注入演示数据，确保历史记录和对比页面不为空
 */
export function seedDemoData() {
  const state = useStore.getState()
  const { history, compareList, addToHistory, toggleCompare, setComparisonCache } = state

  // 已有数据则不注入
  if (history.length > 0) return

  const demoHistory = [
    {
      scenarioId: 'cat',
      adoptionIndex: 4,
      monthlyBudget: 450,
      timeAvailable: 14,
      realityLevel: 7,
      notes: '想养一只布偶猫~',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    },
    {
      scenarioId: 'scuba',
      adoptionIndex: 6,
      monthlyBudget: 800,
      timeAvailable: 16,
      realityLevel: 6,
      notes: '考虑考OW潜水证',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      scenarioId: 'freelance',
      adoptionIndex: 7,
      monthlyBudget: 5000,
      timeAvailable: 35,
      realityLevel: 5,
      notes: '探索自由职业可能',
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
    },
  ]

  const demoComparisons = [
    {
      scenarioId: 'cat',
      title: '猫咪',
      emoji: '🐱',
      color: '#6366f1',
      totalFirstYear: 18500,
      weeklyHours: 10,
      satisfactionScore: 8.2,
    },
    {
      scenarioId: 'scuba',
      title: '潜水',
      emoji: '🤿',
      color: '#0ea5e9',
      totalFirstYear: 28000,
      weeklyHours: 12,
      satisfactionScore: 8.7,
    },
    {
      scenarioId: 'freelance',
      title: '自由职业',
      emoji: '🕊️',
      color: '#f59e0b',
      totalFirstYear: 65000,
      weeklyHours: 20,
      satisfactionScore: 7.8,
    },
  ]

  // 注入历史
  demoHistory.forEach((item) => {
    addToHistory(item)
  })

  // 注入对比
  demoComparisons.forEach((item) => {
    setComparisonCache(item.scenarioId, item)
    toggleCompare(item.scenarioId)
  })
}
