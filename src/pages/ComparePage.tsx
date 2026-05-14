import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { getScenarioById } from '@/config'

export default function ComparePage() {
  const { compareList, comparisonCache, clearCompare } = useStore()

  const items = compareList
    .map((id) => comparisonCache[id])
    .filter(Boolean)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">
              ⚖️ 决策对比
            </h1>
            <p className="text-muted-foreground text-sm">
              横向比较最多4个场景的关键指标
            </p>
          </div>
          {items.length > 0 && (
            <button onClick={clearCompare} className="text-xs text-coral hover:underline">
              清空对比
            </button>
          )}
        </div>
      </motion.div>

      {items.length === 0 ? (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-5xl mb-4">📊</div>
          <p className="text-muted-foreground mb-4">还没有添加对比项</p>
          <p className="text-sm text-muted-foreground/60 mb-4">
            在场景页面点击「加入决策对比」即可
          </p>
          <Link to="/" className="btn-primary inline-block text-sm">
            去探索场景
          </Link>
        </motion.div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">场景</th>
                <th className="text-center p-4 text-sm text-muted-foreground font-medium">
                  首年花费
                </th>
                <th className="text-center p-4 text-sm text-muted-foreground font-medium">
                  周投入时间
                </th>
                <th className="text-center p-4 text-sm text-muted-foreground font-medium">
                  综合满意度
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {items.map((item, i) => {
                  const scenario = getScenarioById(item.scenarioId)
                  return (
                    <motion.tr
                      key={item.scenarioId}
                      className="border-b border-border/50 hover:bg-surface/50 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <td className="p-4">
                        <Link
                          to={
                            scenario
                              ? `/scenario/${scenario.category}/${scenario.slug}`
                              : '#'
                          }
                          className="flex items-center gap-3 hover:opacity-80"
                        >
                          <span className="text-xl">{item.emoji}</span>
                          <span className="font-medium text-sm">{item.title}</span>
                        </Link>
                      </td>
                      <td className="p-4 text-center">
                        <span className="font-mono font-semibold text-sm">
                          ¥{item.totalFirstYear.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: item.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(100, (item.weeklyHours / 40) * 100)}%` }}
                              transition={{ duration: 0.8, delay: i * 0.1 }}
                            />
                          </div>
                          <span className="text-xs font-mono">
                            {Math.round(item.weeklyHours)}h
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: item.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.satisfactionScore / 10) * 100}%` }}
                              transition={{ duration: 0.8, delay: i * 0.15 }}
                            />
                          </div>
                          <span className="text-xs font-mono">
                            {item.satisfactionScore.toFixed(1)}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </tbody>
          </table>

          {/* ── 智能总结 ── */}
          {items.length >= 2 && (
            <motion.div
              className="mt-8 p-5 card-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm font-semibold mb-3 font-display">🤖 智能分析</h3>
              <div className="space-y-2 text-sm">
                {(() => {
                  const cheapest = items.reduce((a, b) =>
                    a.totalFirstYear < b.totalFirstYear ? a : b
                  )
                  const mostTime = items.reduce((a, b) =>
                    a.weeklyHours > b.weeklyHours ? a : b
                  )
                  const mostSat = items.reduce((a, b) =>
                    a.satisfactionScore > b.satisfactionScore ? a : b
                  )
                  return (
                    <>
                      <p className="text-muted-foreground">
                        💰 <strong className="text-foreground">{cheapest.emoji} {cheapest.title}</strong> 首年花费最低（¥{cheapest.totalFirstYear.toLocaleString()}）
                      </p>
                      <p className="text-muted-foreground">
                        ⏰ <strong className="text-foreground">{mostTime.emoji} {mostTime.title}</strong> 需要最多时间投入（每周 {Math.round(mostTime.weeklyHours)}h）
                      </p>
                      <p className="text-muted-foreground">
                        ⭐ <strong className="text-foreground">{mostSat.emoji} {mostSat.title}</strong> 综合满意度最高（{mostSat.satisfactionScore.toFixed(1)}/10）
                      </p>
                    </>
                  )
                })()}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
