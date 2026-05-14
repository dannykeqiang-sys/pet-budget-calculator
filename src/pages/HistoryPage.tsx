import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { getScenarioById, allScenarios } from '@/config'

type TimeFilter = 'all' | 'week' | 'month'

export default function HistoryPage() {
  const { history, removeFromHistory, clearHistory } = useStore()
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all')

  const now = Date.now()
  const WEEK = 1000 * 60 * 60 * 24 * 7
  const MONTH = 1000 * 60 * 60 * 24 * 30

  const filteredHistory = useMemo(() => {
    if (timeFilter === 'week')
      return history.filter((h) => h.createdAt > now - WEEK)
    if (timeFilter === 'month')
      return history.filter((h) => h.createdAt > now - MONTH)
    return history
  }, [history, timeFilter, now])

  /* 统计摘要 */
  const stats = useMemo(() => {
    const scenarios = filteredHistory
      .map((h) => getScenarioById(h.scenarioId))
      .filter(Boolean)

    const categories = new Set(scenarios.map((s) => s!.category))

    const categoryBreakdown: Record<string, number> = {}
    scenarios.forEach((s) => {
      if (s) categoryBreakdown[s.category] = (categoryBreakdown[s.category] || 0) + 1
    })

    return {
      total: filteredHistory.length,
      uniqueScenarios: new Set(filteredHistory.map((h) => h.scenarioId)).size,
      categories: categories.size,
      categoryBreakdown,
    }
  }, [filteredHistory])

  const CATEGORY_LABELS: Record<string, string> = {
    pet: '宠物',
    hobby: '爱好',
    career: '职业',
    skill: '技能',
    life: '生活',
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* ═══ Header ═══ */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display mb-2">
              📋 模拟历史
            </h1>
            <p className="text-muted-foreground text-sm">
              回顾你探索过的每一个决策场景，追踪思考轨迹
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="btn-ghost text-xs text-coral"
            >
              清空全部记录
            </button>
          )}
        </div>
      </motion.div>

      {/* ═══ 空状态 ═══ */}
      {history.length === 0 ? (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-6xl mb-6">📭</div>
          <h2 className="text-xl font-semibold font-display mb-3">还没有模拟记录</h2>
          <p className="text-muted-foreground text-sm mb-2 max-w-md mx-auto">
            在场景页面调整参数后，点击「保存到模拟历史」即可在这里查看
          </p>
          <p className="text-muted-foreground/60 text-xs mb-8">
            系统会自动保存你的预算、时间投入和满意度数据
          </p>
          <Link to="/" className="btn-primary text-sm">
            开始探索场景
          </Link>
        </motion.div>
      ) : (
        <>
          {/* ═══ 统计摘要 ═══ */}
          <motion.div
            className="card-base p-5 sm:p-6 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              📊 探索统计
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-xl bg-surface">
                <div className="text-2xl font-bold font-display">
                  {stats.total}
                </div>
                <div className="text-xs text-muted-foreground mt-1">总模拟次数</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-surface">
                <div className="text-2xl font-bold font-display">
                  {stats.uniqueScenarios}
                </div>
                <div className="text-xs text-muted-foreground mt-1">探索场景数</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-surface">
                <div className="text-2xl font-bold font-display">
                  {stats.categories}
                </div>
                <div className="text-xs text-muted-foreground mt-1">覆盖分类</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-surface">
                <div className="text-2xl font-bold font-display">
                  {allScenarios.length}
                </div>
                <div className="text-xs text-muted-foreground mt-1">总场景数</div>
              </div>
            </div>

            {/* 分类分布 */}
            {Object.keys(stats.categoryBreakdown).length > 1 && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground mb-2">分类分布</div>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(stats.categoryBreakdown).map(([cat, count]) => (
                    <span
                      key={cat}
                      className="text-xs px-2.5 py-1 rounded-full bg-surface text-muted-foreground"
                    >
                      {CATEGORY_LABELS[cat] || cat} ×{count}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* ═══ 时间筛选 ═══ */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">筛选：</span>
            {([
              { key: 'all', label: '全部' },
              { key: 'week', label: '最近一周' },
              { key: 'month', label: '最近一月' },
            ] as const).map((f) => (
              <button
                key={f.key}
                onClick={() => setTimeFilter(f.key)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                  timeFilter === f.key
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'bg-muted text-muted-foreground hover:bg-surface-hover'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* ═══ 历史列表 ═══ */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredHistory.length === 0 ? (
                <motion.div
                  className="text-center py-12 card-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-3xl mb-3">📅</div>
                  <p className="text-sm text-muted-foreground">
                    {timeFilter === 'week' ? '最近一周' : '最近一月'}没有新的模拟记录
                  </p>
                </motion.div>
              ) : (
                filteredHistory.map((item, i) => {
                  const scenario = getScenarioById(item.scenarioId)
                  if (!scenario) return null

                  const daysAgo = Math.round((now - item.createdAt) / (1000 * 60 * 60 * 24))
                  const timeLabel =
                    daysAgo === 0
                      ? '今天'
                      : daysAgo === 1
                        ? '昨天'
                        : daysAgo <= 7
                          ? `${daysAgo}天前`
                          : new Date(item.createdAt).toLocaleDateString('zh-CN', {
                              month: 'short',
                              day: 'numeric',
                            })

                  return (
                    <motion.div
                      key={`${item.scenarioId}-${item.createdAt}`}
                      className="card-base p-4 sm:p-5"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: i * 0.05 }}
                      layout
                    >
                      <div className="flex items-start gap-4">
                        {/* Scenario info */}
                        <Link
                          to={`/scenario/${scenario.category}/${scenario.slug}`}
                          className="flex items-start gap-4 flex-1 min-w-0 group"
                        >
                          <div className="text-3xl shrink-0 group-hover:scale-110 transition-transform">
                            {scenario.emoji}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-sm group-hover:underline">
                                {scenario.title}
                              </h3>
                              <span
                                className="text-[10px] px-1.5 py-0.5 rounded-full"
                                style={{
                                  background: `${scenario.color}15`,
                                  color: scenario.color,
                                }}
                              >
                                {scenario.difficulty}
                              </span>
                            </div>

                            {/* 参数摘要 */}
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              {item.adoptionIndex !== undefined && scenario.adoption?.[item.adoptionIndex] && (
                                <span>
                                  📦 {scenario.adoption[item.adoptionIndex].label}
                                </span>
                              )}
                              {item.monthlyBudget !== undefined && item.monthlyBudget > 0 && (
                                <span>💰 预算 ¥{item.monthlyBudget.toLocaleString()}/月</span>
                              )}
                              {item.timeAvailable !== undefined && item.timeAvailable > 0 && (
                                <span>⏱️ {item.timeAvailable}h/周可用</span>
                              )}
                              {item.realityLevel !== undefined && (
                                <span>🎚️ 现实度 {item.realityLevel}/10</span>
                              )}
                            </div>

                            {/* Notes */}
                            {item.notes && (
                              <p className="text-xs text-muted-foreground/70 mt-1.5 italic line-clamp-1">
                                "{item.notes}"
                              </p>
                            )}
                          </div>
                        </Link>

                        {/* Actions column */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="text-[10px] text-muted-foreground/60">{timeLabel}</span>
                          <div className="flex gap-1.5">
                            <Link
                              to={`/scenario/${scenario.category}/${scenario.slug}`}
                              className="text-[10px] px-2 py-1 rounded bg-surface hover:bg-surface-hover transition-colors text-muted-foreground"
                            >
                              再次探索
                            </Link>
                            <button
                              onClick={() => removeFromHistory(item.scenarioId)}
                              className="text-[10px] px-2 py-1 rounded bg-surface hover:bg-coral/10 hover:text-coral transition-colors text-muted-foreground"
                            >
                              删除
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </AnimatePresence>
          </div>

          {/* Bottom hint */}
          {filteredHistory.length > 0 && (
            <p className="text-center text-xs text-muted-foreground/50 mt-6">
              最多保留 20 条记录 · 旧记录将自动清除
            </p>
          )}
        </>
      )}
    </div>
  )
}
