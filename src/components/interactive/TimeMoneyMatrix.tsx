import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ScenarioConfig } from '@/types/scenario'

interface Props {
  scenario: ScenarioConfig
  monthlyBudget: number
  onBudgetChange: (v: number) => void
  adjustedWeeklyHours: number
}

const BUDGET_PRESETS = [500, 1000, 2000, 3000, 5000, 8000]

export default function TimeMoneyMatrix({
  scenario,
  monthlyBudget,
  onBudgetChange,
  adjustedWeeklyHours,
}: Props) {
  const [showDetail, setShowDetail] = useState(false)

  /* 金钱投入越多 → 时间越少 (购买便利) */
  const baseHours = (scenario.totalWeeklyHours.min + scenario.totalWeeklyHours.max) / 2

  const matrixData = useMemo(() => {
    return BUDGET_PRESETS.map((budget) => {
      // 每 1000 元月预算减少 8% 时间投入
      const reductionFactor = Math.min(0.5, (budget / 1000) * 0.08)
      const timeSaved = baseHours * reductionFactor
      const newHours = Math.max(1, baseHours - timeSaved)
      return {
        budget,
        hours: Math.round(newHours * 10) / 10,
        saved: Math.round(timeSaved * 10) / 10,
        pct: Math.round(reductionFactor * 100),
      }
    })
  }, [baseHours])

  const currentData = matrixData.reduce((prev, curr) =>
    Math.abs(curr.budget - monthlyBudget) < Math.abs(prev.budget - monthlyBudget) ? curr : prev
  )

  /* ── 智能便利建议 ── */
  const convenienceHints = useMemo(() => {
    const hints: { emoji: string; text: string; cost: number }[] = []
    if (monthlyBudget >= 500) {
      hints.push({ emoji: '🤖', text: '自动喂食器/智能设备', cost: 300 })
    }
    if (monthlyBudget >= 1000) {
      hints.push({ emoji: '🏠', text: '上门服务/托管代劳', cost: 800 })
    }
    if (monthlyBudget >= 2000) {
      hints.push({ emoji: '💎', text: '高端订阅/会员服务', cost: 1500 })
    }
    if (monthlyBudget >= 5000) {
      hints.push({ emoji: '👑', text: '专属定制/管家服务', cost: 4000 })
    }
    return hints
  }, [monthlyBudget])

  return (
    <motion.div
      className="card-base p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold font-display">⏳ 时间-金钱矩阵</h3>
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {showDetail ? '收起 ▼' : '展开详情 ▶'}
        </button>
      </div>

      {/* ── 主矩阵可视化 ── */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        {/* 左：金钱投入 */}
        <div>
          <div className="text-xs text-muted-foreground mb-2">💰 月预算投入</div>
          <div className="relative">
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={monthlyBudget}
              onChange={(e) => onBudgetChange(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(monthlyBudget / 10000) * 100}%, hsl(var(--muted)) ${(monthlyBudget / 10000) * 100}%, hsl(var(--muted)) 100%)`,
              }}
            />
            <div className="flex justify-between mt-1.5">
              {BUDGET_PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => onBudgetChange(p)}
                  className={`text-[10px] px-1.5 py-0.5 rounded-full transition-all duration-200 ${
                    Math.abs(p - monthlyBudget) < 200
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  ¥{(p / 1000).toFixed(1)}k
                </button>
              ))}
            </div>
          </div>
          <motion.div
            className="mt-3 p-3 rounded-xl bg-surface text-center"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.3, delay: 0.1 }}
            key={monthlyBudget}
          >
            <span className="text-2xl font-bold font-display gradient-text">
              ¥{monthlyBudget.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">/月</span>
          </motion.div>
        </div>

        {/* 右：时间节省 */}
        <div>
          <div className="text-xs text-muted-foreground mb-2">⏱️ 预计时间投入</div>
          <div className="relative h-[88px] flex items-end gap-1">
            {matrixData.map((d) => {
              const maxH = baseHours * 1.2
              const h = (d.hours / maxH) * 100
              const isCurrent = Math.abs(d.budget - monthlyBudget) < 200
              return (
                <motion.div
                  key={d.budget}
                  className="flex-1 rounded-t-lg relative group"
                  style={{
                    height: `${h * 0.8}%`,
                    background: isCurrent
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--primary) / 0.2)',
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${h * 0.8}%` }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {d.hours}h
                  </span>
                </motion.div>
              )
            })}
          </div>
          <div className="text-center mt-2">
            <motion.div
              className="text-xs"
              key={`hours-${monthlyBudget}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-muted-foreground">从 </span>
              <span className="font-semibold text-coral font-mono">{baseHours.toFixed(1)}h</span>
              <span className="text-muted-foreground"> → </span>
              <span className="font-semibold text-sage font-mono">{currentData.hours}h</span>
              <span className="text-muted-foreground">/周</span>
            </motion.div>
            <div className="text-xs text-sage mt-0.5">
              节省 {currentData.saved}h/周 ({currentData.pct}%)
            </div>
          </div>
        </div>
      </div>

      {/* ── 便利工具推荐 ── */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border pt-4">
              <div className="text-xs text-muted-foreground mb-3">
                🛠️ 用金钱换时间的智能方案
              </div>
              <div className="flex flex-wrap gap-2">
                {convenienceHints.map((hint, i) => (
                  <motion.div
                    key={hint.text}
                    className="px-3 py-2 rounded-lg bg-surface border border-border/50 text-sm cursor-default"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.03, borderColor: 'hsl(var(--primary) / 0.4)' }}
                  >
                    <span className="mr-1.5">{hint.emoji}</span>
                    <span>{hint.text}</span>
                    <span className="ml-2 text-xs text-muted-foreground font-mono">
                      ~¥{hint.cost}/月
                    </span>
                  </motion.div>
                ))}
                {convenienceHints.length === 0 && (
                  <span className="text-xs text-muted-foreground">
                    增加月预算即可解锁智能便利方案
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 核心洞察 ── */}
      <motion.div
        className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10 text-center text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        💡 每月多投入 ¥1,000 ≈ 节省约 {(baseHours * 0.08).toFixed(1)} 小时/周
        {monthlyBudget >= 3000 && (
          <span className="text-sage font-medium">
            {' '}— 你已解锁「时间自由」模式
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
