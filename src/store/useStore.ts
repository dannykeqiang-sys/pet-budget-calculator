import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ScenarioInput, ComparisonItem } from '@/types/scenario'

interface SimulationStore {
  /* ── 场景输入缓存 ── */
  scenarioInputs: Record<string, ScenarioInput>
  setScenarioInput: (scenarioId: string, input: Partial<ScenarioInput>) => void
  clearScenarioInput: (scenarioId: string) => void

  /* ── 模拟历史 ── */
  history: ScenarioInput[]
  addToHistory: (input: ScenarioInput) => void
  removeFromHistory: (id: string) => void
  clearHistory: () => void

  /* ── 决策对比 ── */
  compareList: string[]
  comparisonCache: Record<string, ComparisonItem>
  toggleCompare: (scenarioId: string) => void
  setComparisonCache: (scenarioId: string, data: ComparisonItem) => void
  clearCompare: () => void

  /* ── 偏好设置 ── */
  reduceMotion: boolean
  setReduceMotion: (v: boolean) => void
}

export const useStore = create<SimulationStore>()(
  persist(
    (set, get) => ({
      /* ── 场景输入 ── */
      scenarioInputs: {},
      setScenarioInput: (scenarioId, input) =>
        set((state) => ({
          scenarioInputs: {
            ...state.scenarioInputs,
            [scenarioId]: {
              ...state.scenarioInputs[scenarioId],
              adoptionIndex: 0,
              createdAt: Date.now(),
              ...input,
              scenarioId,
            },
          },
        })),
      clearScenarioInput: (scenarioId) =>
        set((state) => {
          const { [scenarioId]: _, ...rest } = state.scenarioInputs
          return { scenarioInputs: rest }
        }),

      /* ── 历史 ── */
      history: [],
      addToHistory: (input) =>
        set((state) => {
          const filtered = state.history.filter((h) => h.scenarioId !== input.scenarioId)
          const updated = [{ ...input, createdAt: Date.now() }, ...filtered]
          return { history: updated.slice(0, 20) }
        }),
      removeFromHistory: (scenarioId) =>
        set((state) => ({
          history: state.history.filter((h) => h.scenarioId !== scenarioId),
        })),
      clearHistory: () => set({ history: [] }),

      /* ── 对比 ── */
      compareList: [],
      comparisonCache: {},
      toggleCompare: (scenarioId) =>
        set((state) => {
          const exists = state.compareList.includes(scenarioId)
          if (exists) {
            const { [scenarioId]: _, ...rest } = state.comparisonCache
            return {
              compareList: state.compareList.filter((id) => id !== scenarioId),
              comparisonCache: rest,
            }
          }
          if (state.compareList.length >= 4) return state
          return { compareList: [...state.compareList, scenarioId] }
        }),
      setComparisonCache: (scenarioId, data) =>
        set((state) => ({
          comparisonCache: { ...state.comparisonCache, [scenarioId]: data },
        })),
      clearCompare: () => set({ compareList: [], comparisonCache: {} }),

      /* ── 偏好 ── */
      reduceMotion: false,
      setReduceMotion: (v) => set({ reduceMotion: v }),
    }),
    {
      name: 'simulator-store',
      partialize: (state) => ({
        scenarioInputs: state.scenarioInputs,
        history: state.history,
        compareList: state.compareList,
        comparisonCache: state.comparisonCache,
        reduceMotion: state.reduceMotion,
      }),
    }
  )
)
