import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ScenarioConfig, ScenarioInput } from '@/types/scenario'
import { useStore } from '@/store/useStore'
import SatisfactionChart from './SatisfactionChart'

/* ── 新增交互组件 ── */
import RealitySlider from '@/components/interactive/RealitySlider'
import TimeMoneyMatrix from '@/components/interactive/TimeMoneyMatrix'
import ProgressStepper from '@/components/interactive/ProgressStepper'
import InteractiveChart from '@/components/interactive/InteractiveChart'

interface Props {
  scenario: ScenarioConfig
}

export default function CalculatorEngine({ scenario }: Props) {
  const {
    scenarioInputs,
    setScenarioInput,
    addToHistory,
    compareList,
    toggleCompare,
    setComparisonCache,
  } = useStore()

  const input = scenarioInputs[scenario.id] ?? {
    scenarioId: scenario.id,
    adoptionIndex: 0,
    monthlyBudget: 0,
    timeAvailable: 0,
    realityLevel: 5,
    createdAt: Date.now(),
  }

  const updateInput = (patch: Partial<ScenarioInput>) => {
    setScenarioInput(scenario.id, patch)
  }

  const isCompared = compareList.includes(scenario.id)

  /* ── 计算 ── */
  const calculations = useMemo(() => {
    const adoptionCost =
      scenario.adoption && input.adoptionIndex !== undefined
        ? scenario.adoption[input.adoptionIndex]?.priceRange[0] ?? 0
        : 0

    const sectionTotals = scenario.sections.map((section) => {
      const total = section.items.reduce((sum, item) => {
        switch (item.frequency) {
          case 'monthly':
            return sum + item.amount * 12
          case 'weekly':
            return sum + item.amount * 52
          case 'yearly':
          case 'once':
          default:
            return sum + item.amount
        }
      }, 0)
      return { title: section.title, total }
    })

    const totalFirstYear = adoptionCost + sectionTotals.reduce((s, st) => s + st.total, 0)

    const satisfactionScore = Object.values(scenario.satisfactionRatings).reduce(
      (sum, v) => sum + v,
      0
    ) / 6

    const realityFactor = input.realityLevel ? (input.realityLevel - 5) * 0.06 : 0
    const adjustedWeeklyHours =
      scenario.totalWeeklyHours.min +
      ((scenario.totalWeeklyHours.max - scenario.totalWeeklyHours.min) * 0.5) +
      realityFactor * 10

    return {
      adoptionCost,
      sectionTotals,
      totalFirstYear,
      satisfactionScore,
      adjustedWeeklyHours: Math.max(1, adjustedWeeklyHours),
      realityFactor,
    }
  }, [scenario, input.adoptionIndex, input.realityLevel])

  const handleSaveHistory = () => {
    addToHistory({
      ...input,
      createdAt: Date.now(),
    })
  }

  const handleToggleCompare = () => {
    toggleCompare(scenario.id)
    if (!isCompared) {
      setComparisonCache(scenario.id, {
        scenarioId: scenario.id,
        title: scenario.title,
        emoji: scenario.emoji,
        color: scenario.color,
        totalFirstYear: calculations.totalFirstYear,
        weeklyHours: calculations.adjustedWeeklyHours,
        satisfactionScore: calculations.satisfactionScore,
      })
    }
  }

  return (
    <div className="space-y-10">
      {/* ══════ 1. 现实滑块 ══════ */}
      <RealitySlider
        value={input.realityLevel ?? 5}
        onChange={(v) => updateInput({ realityLevel: v })}
        scenarioTitle={scenario.title}
      />

      {/* ══════ 2. 时空矩阵 ══════ */}
      <TimeMoneyMatrix
        scenario={scenario}
        monthlyBudget={input.monthlyBudget ?? 0}
        onBudgetChange={(v) => updateInput({ monthlyBudget: v })}
        adjustedWeeklyHours={calculations.adjustedWeeklyHours}
      />

      {/* ══════ 3. 摘要卡片 ══════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard
          label="初始投入"
          value={`¥${calculations.adoptionCost.toLocaleString()}`}
          color={scenario.color}
          delay={0}
        />
        <SummaryCard
          label="首年总花费"
          value={`¥${calculations.totalFirstYear.toLocaleString()}`}
          color={scenario.color}
          delay={0.1}
          highlight
        />
        <SummaryCard
          label="满意度"
          value={`${calculations.satisfactionScore.toFixed(1)}/10`}
          color={scenario.color}
          delay={0.2}
        />
        <SummaryCard
          label="周投入时间"
          value={`${Math.round(calculations.adjustedWeeklyHours)}h`}
          color={scenario.color}
          delay={0.3}
        />
      </div>

      {/* ══════ 4. 进度条 ══════ */}
      <ProgressStepper scenario={scenario} />

      {/* ══════ 5. 交互图表 ══════ */}
      <InteractiveChart
        scenario={scenario}
        totalFirstYear={calculations.totalFirstYear}
        color={scenario.color}
      />

      {/* ══════ 6. 采用方式选择 ══════ */}
      {scenario.adoption && scenario.adoption.length > 1 && (
        <motion.div
          className="card-base p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
            选择方式
          </h3>
          <div className="flex gap-3">
            {scenario.adoption.map((opt, i) => (
              <button
                key={opt.id}
                onClick={() => updateInput({ adoptionIndex: i })}
                className={`flex-1 p-3 rounded-lg border text-left transition-all duration-300 ${
                  (input.adoptionIndex ?? 0) === i
                    ? 'border-primary bg-primary/5 shadow-glow'
                    : 'border-border hover:border-primary/30 bg-card'
                }`}
                style={
                  (input.adoptionIndex ?? 0) === i
                    ? ({ '--glow-color': `${scenario.color}20` } as React.CSSProperties)
                    : undefined
                }
              >
                <div className="text-xs text-muted-foreground mb-1">{opt.label}</div>
                <div className="text-sm font-semibold font-mono">
                  ¥{opt.priceRange[0].toLocaleString()} - ¥{opt.priceRange[1].toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{opt.description}</div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ══════ 7. 满意度雷达 ══════ */}
      <SatisfactionChart ratings={scenario.satisfactionRatings} color={scenario.color} />

      {/* ══════ 8. 时间投入 ══════ */}
      <div className="card-base p-6">
        <h3 className="text-lg font-semibold mb-4 font-display">时间投资明细</h3>
        <div className="space-y-2">
          {scenario.timeInvestment.map((t, i) => {
            const pct =
              ((t.hoursPerWeek[0] + t.hoursPerWeek[1]) / 2 / scenario.totalWeeklyHours.max) * 100
            return (
              <motion.div
                key={t.label}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="w-8 text-center">{t.icon}</span>
                <span className="text-sm w-24 shrink-0">{t.label}</span>
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: scenario.color, width: `${pct}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  />
                </div>
                <span className="text-xs font-mono text-muted-foreground w-20 text-right">
                  {t.hoursPerWeek[0]}-{t.hoursPerWeek[1]}h/周
                </span>
              </motion.div>
            )
          })}
        </div>
        <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm">
          <span className="text-muted-foreground">总计</span>
          <span className="font-semibold font-display">
            {scenario.totalWeeklyHours.min}-{scenario.totalWeeklyHours.max}h/周
          </span>
        </div>
      </div>

      {/* ══════ 9. 费用明细 (可展开) ══════ */}
      {scenario.sections.map((section, si) => (
        <ExpandableSection key={section.title} scenario={scenario} section={section} index={si} />
      ))}

      {/* ══════ 10. 收益卡片 ══════ */}
      <div className="card-base p-6">
        <h3 className="text-lg font-semibold mb-4 font-display">预期收益</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {scenario.benefits.map((b, i) => (
            <motion.div
              key={b.title}
              className="p-4 rounded-xl bg-surface hover:bg-surface-hover transition-colors"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-2xl mb-2">{b.icon}</div>
              <h4 className="font-semibold text-sm mb-1">{b.title}</h4>
              <p className="text-xs text-muted-foreground">{b.description}</p>
              <span
                className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: b.impact === 'high' ? `${scenario.color}20` : 'hsl(var(--muted))',
                  color: b.impact === 'high' ? scenario.color : 'hsl(var(--muted-foreground))',
                }}
              >
                {b.impact === 'high' ? '高影响' : b.impact === 'medium' ? '中影响' : '低影响'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════ 11. 知识卡片 ══════ */}
      <div className="card-base p-6">
        <h3 className="text-lg font-semibold mb-4 font-display">必知必会</h3>
        <div className="space-y-3">
          {scenario.knowledgeCards.map((k, i) => (
            <motion.div
              key={k.title}
              className="p-4 rounded-xl bg-surface"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span>{k.icon}</span>
                <h4 className="font-medium text-sm">{k.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground">{k.content}</p>
              {k.tip && (
                <div className="mt-2 text-xs px-3 py-1.5 rounded-lg bg-accent/10 text-accent border border-accent/20">
                  💡 {k.tip}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════ 12. 风险预警 ══════ */}
      {scenario.risks && scenario.risks.length > 0 && (
        <div className="card-base p-6 border-coral/20">
          <h3 className="text-lg font-semibold mb-4 text-coral font-display">风险须知</h3>
          <div className="space-y-3">
            {scenario.risks.map((r, i) => (
              <div key={r.risk} className="flex items-start gap-3 p-3 rounded-lg bg-coral/5">
                <span className="text-lg shrink-0 mt-0.5">⚠️</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{r.risk}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        r.probability === 'high'
                          ? 'bg-coral/15 text-coral'
                          : r.probability === 'medium'
                            ? 'bg-honey/15 text-honey'
                            : 'bg-sage/15 text-sage'
                      }`}
                    >
                      {r.probability === 'high' ? '高概率' : r.probability === 'medium' ? '中概率' : '低概率'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════ 13. 清单 ══════ */}
      <div className="card-base p-6">
        <h3 className="text-lg font-semibold mb-4 font-display">准备工作清单</h3>
        <div className="space-y-2">
          {scenario.checklist.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface transition-colors cursor-pointer"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="w-5 h-5 rounded border-2 border-muted-foreground/30 shrink-0 mt-0.5 flex items-center justify-center hover:border-primary transition-colors" />
              <span className="text-sm">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════ 14. 趣味冷知识 ══════ */}
      <motion.div
        className="card-base p-5 bg-gradient-to-br from-surface to-card text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">冷知识</span>
        <p className="mt-2 text-sm italic text-muted-foreground">“{scenario.funFact}”</p>
      </motion.div>

      {/* ══════ 操作按钮 ══════ */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button onClick={handleSaveHistory} className="btn-primary">
          💾 保存到模拟历史
        </button>
        <button onClick={handleToggleCompare} className="btn-secondary">
          {isCompared ? '✅ 已加入对比' : '📊 加入决策对比'}
        </button>
      </div>
    </div>
  )
}

/* ── 子组件 ── */

function SummaryCard({
  label,
  value,
  color,
  delay,
  highlight,
}: {
  label: string
  value: string
  color: string
  delay: number
  highlight?: boolean
}) {
  return (
    <motion.div
      className={`card-base p-4 text-center ${highlight ? 'ring-2 ring-primary/30' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 0.3, duration: 0.4 }}
    >
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div
        className="text-xl font-bold font-display"
        style={{ color: highlight ? color : undefined }}
      >
        {value}
      </div>
    </motion.div>
  )
}

function ExpandableSection({
  scenario,
  section,
  index,
}: {
  scenario: ScenarioConfig
  section: ScenarioConfig['sections'][number]
  index: number
}) {
  const [open, setOpen] = useState(false)
  const total = section.items.reduce((sum, item) => {
    switch (item.frequency) {
      case 'monthly':
        return sum + item.amount * 12
      case 'weekly':
        return sum + item.amount * 52
      default:
        return sum + item.amount
    }
  }, 0)

  return (
    <motion.div
      className="card-base overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-center justify-between hover:bg-surface/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{section.icon}</span>
          <div className="text-left">
            <h4 className="font-semibold text-sm">{section.title}</h4>
            <span className="text-xs text-muted-foreground font-mono">
              ¥{total.toLocaleString()}/年
            </span>
          </div>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-muted-foreground"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 space-y-2">
              {section.items.map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-t border-border/50">
                  <div>
                    <span className="text-sm">{item.label}</span>
                    {item.note && (
                      <span className="text-xs text-muted-foreground ml-2">({item.note})</span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono font-medium">¥{item.amount}</span>
                    <span className="text-xs text-muted-foreground ml-1">/{
                      item.frequency === 'once' ? '次' :
                      item.frequency === 'monthly' ? '月' :
                      item.frequency === 'weekly' ? '周' : '年'
                    }</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
