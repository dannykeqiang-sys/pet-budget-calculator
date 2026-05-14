import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { getScenarioById } from '@/config'
import type { ComparisonItem } from '@/types/scenario'

export default function ComparePage() {
  const { compareList, comparisonCache, clearCompare } = useStore()
  const [viewMode, setViewMode] = useState<'split' | 'grid'>('split')

  const items = compareList
    .map((id) => comparisonCache[id])
    .filter(Boolean) as ComparisonItem[]

  /* 取前两个做分屏对比 */
  const [left, right] = useMemo(() => {
    if (items.length >= 2) return [items[0], items[1]]
    return [items[0] ?? null, items[1] ?? null]
  }, [items])

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-6xl mb-6">📊</div>
          <h1 className="text-3xl font-bold font-display mb-3">决策对比</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            在任意场景页面点击「加入决策对比」，即可在这里进行分屏比较
          </p>
          <Link to="/" className="btn-primary inline-flex text-sm">
            去探索场景
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* ── Header ── */}
      <motion.div
        className="flex items-center justify-between mb-8 flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display mb-1">⚖️ 决策对比</h1>
          <p className="text-sm text-muted-foreground">
            {items.length === 2 ? '分屏对比模式' : `${items.length} 个场景对比中`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {items.length >= 2 && (
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 text-xs transition-colors ${
                  viewMode === 'split'
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:bg-surface'
                }`}
              >
                分屏对比
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 text-xs border-l border-border transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:bg-surface'
                }`}
              >
                列表视图
              </button>
            </div>
          )}
          <button onClick={clearCompare} className="btn-ghost text-xs text-coral">
            清空全部
          </button>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════
       *  SPLIT-SCREEN MODE (2 items)
       * ════════════════════════════════════════════ */}
      {viewMode === 'split' && left && right && (
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
            {/* Left Panel */}
            <SplitPanel item={left} side="left" />

            {/* Right Panel */}
            <SplitPanel item={right} side="right" />
          </div>

          {/* ── VS Divider ── */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <motion.div
              className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-glow"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              VS
            </motion.div>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* ── Head-to-Head Comparison ── */}
          <HeadToHeadComparison left={left} right={right} />

          {/* ── Recommendation ── */}
          <Recommendation left={left} right={right} />

          {/* ── Extra items ── */}
          {items.length > 2 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                其他对比项 ({items.length - 2})
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {items.slice(2).map((item) => (
                  <ExtraItemCard key={item.scenarioId} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════
       *  GRID MODE (all items)
       * ════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' && (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <GridComparison items={items} />
            {items.length >= 2 && <Recommendation left={items[0]} right={items[1]} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ════════════════════════════════════════════
 *  Split Panel Component
 * ════════════════════════════════════════════ */
function SplitPanel({ item, side }: { item: ComparisonItem; side: 'left' | 'right' }) {
  const scenario = getScenarioById(item.scenarioId)
  const bgVar = side === 'left' ? '--gradient-compare-left' : '--gradient-compare-right'

  return (
    <motion.div
      className="card-base p-5 sm:p-6 relative overflow-hidden"
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ background: `var(${bgVar})` }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <Link
            to={scenario ? `/scenario/${scenario.category}/${scenario.slug}` : '#'}
            className="flex items-center gap-3 group"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">
              {item.emoji}
            </span>
            <div>
              <h2 className="font-semibold text-lg font-display group-hover:opacity-80 transition-opacity">
                {item.title}
              </h2>
              <span className="text-[10px] text-muted-foreground bg-surface px-2 py-0.5 rounded-full">
                {scenario?.category ?? ''}
              </span>
            </div>
          </Link>
        </div>

        {/* Key Metrics */}
        <div className="space-y-4">
          <MetricBar
            label="首年预算"
            value={item.totalFirstYear}
            max={Math.max(item.totalFirstYear, 1) * 1.5}
            prefix="¥"
            format={(v) => v.toLocaleString()}
            color={item.color}
          />
          <MetricBar
            label="周投入时间"
            value={item.weeklyHours}
            max={40}
            prefix=""
            suffix="h"
            format={(v) => Math.round(v).toString()}
            color={item.color}
          />
          <MetricBar
            label="综合满意度"
            value={item.satisfactionScore}
            max={10}
            suffix="/10"
            format={(v) => v.toFixed(1)}
            color={item.color}
          />
        </div>

        {/* Tags */}
        {scenario && (
          <div className="flex flex-wrap gap-1.5 mt-5">
            <span
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: `${item.color}15`, color: item.color }}
            >
              {scenario.difficulty}
            </span>
            {scenario.lifespan && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-muted-foreground">
                {scenario.lifespan}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════
 *  Metric Bar
 * ════════════════════════════════════════════ */
function MetricBar({
  label,
  value,
  max,
  prefix = '',
  suffix = '',
  format,
  color,
}: {
  label: string
  value: number
  max: number
  prefix?: string
  suffix?: string
  format: (v: number) => string
  color: string
}) {
  const pct = Math.min(100, (value / max) * 100)

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-mono font-semibold">
          {prefix}{format(value)}{suffix}
        </span>
      </div>
      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════
 *  Head-to-Head Comparison Table
 * ════════════════════════════════════════════ */
function HeadToHeadComparison({
  left,
  right,
}: {
  left: ComparisonItem
  right: ComparisonItem
}) {
  const rows = [
    {
      label: '首年花费',
      icon: '💰',
      leftVal: `¥${left.totalFirstYear.toLocaleString()}`,
      rightVal: `¥${right.totalFirstYear.toLocaleString()}`,
      better:
        left.totalFirstYear < right.totalFirstYear
          ? 'left'
          : right.totalFirstYear < left.totalFirstYear
            ? 'right'
            : null,
    },
    {
      label: '周投入时间',
      icon: '⏱️',
      leftVal: `${Math.round(left.weeklyHours)}h`,
      rightVal: `${Math.round(right.weeklyHours)}h`,
      better:
        left.weeklyHours < right.weeklyHours
          ? 'left'
          : right.weeklyHours < left.weeklyHours
            ? 'right'
            : null,
    },
    {
      label: '综合满意度',
      icon: '⭐',
      leftVal: `${left.satisfactionScore.toFixed(1)}/10`,
      rightVal: `${right.satisfactionScore.toFixed(1)}/10`,
      better:
        left.satisfactionScore > right.satisfactionScore
          ? 'left'
          : right.satisfactionScore > left.satisfactionScore
            ? 'right'
            : null,
    },
    {
      label: '性价比指数',
      icon: '📊',
      leftVal: ((left.satisfactionScore * 10000) / Math.max(1, left.totalFirstYear)).toFixed(0),
      rightVal: ((right.satisfactionScore * 10000) / Math.max(1, right.totalFirstYear)).toFixed(0),
      better:
        left.satisfactionScore / Math.max(1, left.totalFirstYear) >
        right.satisfactionScore / Math.max(1, right.totalFirstYear)
          ? 'left'
          : right.satisfactionScore / Math.max(1, right.totalFirstYear) >
              left.satisfactionScore / Math.max(1, left.totalFirstYear)
            ? 'right'
            : null,
    },
  ]

  return (
    <motion.div
      className="card-base p-5 sm:p-6"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
        📋 逐项对比
      </h3>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">指标</th>
              <th className="text-center py-2 px-3 text-xs font-medium" style={{ color: left.color }}>
                {left.emoji} {left.title}
              </th>
              <th className="text-center py-2 px-3 text-xs font-medium" style={{ color: right.color }}>
                {right.emoji} {right.title}
              </th>
              <th className="text-center py-2 px-3 text-xs text-muted-foreground font-medium">优势方</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.label}
                className="border-b border-border/40"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <td className="py-3 px-3 text-sm">
                  <span className="mr-1.5">{row.icon}</span>
                  {row.label}
                </td>
                <td
                  className={`text-center py-3 px-3 text-sm font-mono ${
                    row.better === 'left' ? 'font-semibold' : 'text-muted-foreground'
                  }`}
                >
                  {row.leftVal}
                  {row.better === 'left' && (
                    <span className="ml-1.5 text-sage">✓</span>
                  )}
                </td>
                <td
                  className={`text-center py-3 px-3 text-sm font-mono ${
                    row.better === 'right' ? 'font-semibold' : 'text-muted-foreground'
                  }`}
                >
                  {row.rightVal}
                  {row.better === 'right' && (
                    <span className="ml-1.5 text-sage">✓</span>
                  )}
                </td>
                <td className="text-center py-3 px-3 text-xs">
                  {row.better === 'left' ? (
                    <span className="badge bg-primary/10 text-primary">← {left.title}</span>
                  ) : row.better === 'right' ? (
                    <span className="badge bg-accent/10 text-accent">{right.title} →</span>
                  ) : (
                    <span className="text-muted-foreground">持平</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="sm:hidden space-y-3">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            className="p-3 rounded-xl bg-surface"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span>{row.icon}</span>
              <span className="text-xs text-muted-foreground">{row.label}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className={row.better === 'left' ? 'font-semibold' : 'text-muted-foreground'}>
                {left.emoji} {row.leftVal}
                {row.better === 'left' && ' ✓'}
              </span>
              <span className="text-muted-foreground">vs</span>
              <span className={row.better === 'right' ? 'font-semibold' : 'text-muted-foreground'}>
                {right.emoji} {row.rightVal}
                {row.better === 'right' && ' ✓'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════
 *  Recommendation
 * ════════════════════════════════════════════ */
function Recommendation({
  left,
  right,
}: {
  left: ComparisonItem
  right: ComparisonItem
}) {
  const leftScore =
    (left.satisfactionScore * 10000) / Math.max(1, left.totalFirstYear) - left.weeklyHours * 0.5
  const rightScore =
    (right.satisfactionScore * 10000) / Math.max(1, right.totalFirstYear) - right.weeklyHours * 0.5

  const winner = leftScore >= rightScore ? left : right
  const loser = leftScore >= rightScore ? right : left
  const reasons: string[] = []

  if (winner.totalFirstYear < loser.totalFirstYear)
    reasons.push(`预算更友好（¥${winner.totalFirstYear.toLocaleString()} vs ¥${loser.totalFirstYear.toLocaleString()}）`)
  if (winner.weeklyHours < loser.weeklyHours)
    reasons.push(`时间投入更少（${Math.round(winner.weeklyHours)}h vs ${Math.round(loser.weeklyHours)}h/周）`)
  if (winner.satisfactionScore >= loser.satisfactionScore)
    reasons.push(`满意度更高（${winner.satisfactionScore.toFixed(1)} vs ${loser.satisfactionScore.toFixed(1)}）`)
  if (reasons.length === 0)
    reasons.push(`${winner.emoji} 的综合性价比略胜一筹`)

  return (
    <motion.div
      className="card-base p-5 sm:p-6 border-primary/10"
      style={{ background: `var(--gradient-hero)` }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🎯</span>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          决策建议
        </h3>
      </div>

      <div className="flex items-center gap-4 flex-wrap mb-4">
        <motion.div
          className="flex items-center gap-3"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-3xl">{winner.emoji}</span>
          <div>
            <div className="text-xs text-muted-foreground">推荐选择</div>
            <div className="text-lg font-bold font-display" style={{ color: winner.color }}>
              {winner.title}
            </div>
          </div>
        </motion.div>
        <span className="badge bg-primary/10 text-primary">
          性价比领先
        </span>
      </div>

      <div className="space-y-1.5 mb-4 text-sm text-muted-foreground">
        {reasons.map((r, i) => (
          <p key={i}>• {r}</p>
        ))}
      </div>

      <div className="text-xs text-muted-foreground/70 border-t border-border pt-3">
        ⚠️ 此建议仅基于当前数据指标。最终决策请结合个人偏好、实际情况和长期目标综合判断。
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════
 *  Grid Comparison (all items)
 * ════════════════════════════════════════════ */
function GridComparison({ items }: { items: ComparisonItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-3 text-xs text-muted-foreground font-medium">场景</th>
            <th className="text-center p-3 text-xs text-muted-foreground font-medium">首年花费</th>
            <th className="text-center p-3 text-xs text-muted-foreground font-medium">周投入时间</th>
            <th className="text-center p-3 text-xs text-muted-foreground font-medium">综合满意度</th>
            <th className="text-center p-3 text-xs text-muted-foreground font-medium">性价比</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {items.map((item, i) => {
              const scenario = getScenarioById(item.scenarioId)
              const valueScore = (
                (item.satisfactionScore * 10000) /
                Math.max(1, item.totalFirstYear)
              ).toFixed(0)
              return (
                <motion.tr
                  key={item.scenarioId}
                  className="border-b border-border/40 hover:bg-surface/40 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className="p-3">
                    <Link
                      to={scenario ? `/scenario/${scenario.category}/${scenario.slug}` : '#'}
                      className="flex items-center gap-2.5 hover:opacity-80"
                    >
                      <span className="text-lg">{item.emoji}</span>
                      <span className="font-medium text-sm">{item.title}</span>
                    </Link>
                  </td>
                  <td className="p-3 text-center font-mono text-sm">
                    ¥{item.totalFirstYear.toLocaleString()}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: item.color }}
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${Math.min(100, (item.weeklyHours / 40) * 100)}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <span className="text-xs font-mono">{Math.round(item.weeklyHours)}h</span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: item.color }}
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${(item.satisfactionScore / 10) * 100}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        />
                      </div>
                      <span className="text-xs font-mono">
                        {item.satisfactionScore.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-xs font-mono font-medium text-muted-foreground">
                      {valueScore}
                    </span>
                  </td>
                </motion.tr>
              )
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}

function ExtraItemCard({ item }: { item: ComparisonItem }) {
  const scenario = getScenarioById(item.scenarioId)
  return (
    <motion.div
      className="card-base p-4"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link
        to={scenario ? `/scenario/${scenario.category}/${scenario.slug}` : '#'}
        className="flex items-center gap-3"
      >
        <span className="text-xl">{item.emoji}</span>
        <div>
          <span className="text-sm font-medium">{item.title}</span>
          <div className="text-xs text-muted-foreground mt-0.5 font-mono">
            ¥{item.totalFirstYear.toLocaleString()} ·⭐{item.satisfactionScore.toFixed(1)}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
