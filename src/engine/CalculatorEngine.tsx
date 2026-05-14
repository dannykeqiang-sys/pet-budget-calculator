import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ScenarioConfig, ScenarioInput, CostItem, CostTip } from '@/types/scenario'
import { useStore } from '@/store/useStore'
import SatisfactionChart from './SatisfactionChart'

/* ── 交互组件 ── */
import RealitySlider from '@/components/interactive/RealitySlider'
import TimeMoneyMatrix from '@/components/interactive/TimeMoneyMatrix'
import ProgressStepper from '@/components/interactive/ProgressStepper'
import InteractiveChart from '@/components/interactive/InteractiveChart'
import VisualMetaphor from '@/components/interactive/VisualMetaphor'
import FuturePreview from '@/components/interactive/FuturePreview'

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

  /* ══════ 核心计算（含折旧率 + Buffer Factor） ══════ */
  const calculations = useMemo(() => {
    const adoptionCost =
      scenario.adoption && input.adoptionIndex !== undefined
        ? scenario.adoption[input.adoptionIndex]?.priceRange[0] ?? 0
        : 0

    /* 收集所有有折旧的金额 */
    let depreciationTotal = 0
    const depreciationItems: { label: string; annualDep: number; lifespan: number; original: number }[] = []

    const sectionTotals = scenario.sections.map((section) => {
      const total = section.items.reduce((sum, item) => {
        let yearly = 0
        switch (item.frequency) {
          case 'monthly':
            yearly = item.amount * 12
            break
          case 'weekly':
            yearly = item.amount * 52
            break
          case 'yearly':
          case 'once':
          default:
            yearly = item.amount
            break
        }

        /* 折旧计算：仅对一次性投入的设备类 */
        if (item.depreciationRate && item.lifespan && item.frequency === 'once') {
          const annualDep = item.amount * item.depreciationRate
          depreciationTotal += annualDep
          depreciationItems.push({
            label: item.label,
            annualDep: Math.round(annualDep),
            lifespan: item.lifespan,
            original: item.amount,
          })
        }

        return sum + yearly
      }, 0)
      return { title: section.title, total }
    })

    const baseFirstYear = adoptionCost + sectionTotals.reduce((s, st) => s + st.total, 0)

    /* Buffer Factor：预期落差纠偏 */
    const bufferFactor = scenario.bufferFactor ?? 1
    const totalFirstYear = Math.round(baseFirstYear * bufferFactor)
    const bufferAmount = totalFirstYear - baseFirstYear

    /* 满意度 */
    const satisfactionScore =
      Object.values(scenario.satisfactionRatings).reduce((sum, v) => sum + v, 0) / 6

    /* 现实滑块影响 */
    const realityFactor = input.realityLevel ? (input.realityLevel - 5) * 0.06 : 0
    const adjustedWeeklyHours = Math.max(1,
      scenario.totalWeeklyHours.min +
        ((scenario.totalWeeklyHours.max - scenario.totalWeeklyHours.min) * 0.5) +
        realityFactor * 10
    )

    /* 对比基线 */
    const baselineAnnual =
      scenario.comparisonBaseline
        ? scenario.comparisonBaseline.unitPrice * 365
        : 0
    const baselineMonthly = scenario.comparisonBaseline
      ? scenario.comparisonBaseline.unitPrice * 30
      : 0

    return {
      adoptionCost,
      sectionTotals,
      baseFirstYear,
      totalFirstYear,
      bufferAmount,
      bufferFactor,
      depreciationTotal: Math.round(depreciationTotal),
      depreciationItems,
      satisfactionScore,
      adjustedWeeklyHours,
      realityFactor,
      baselineAnnual,
      baselineMonthly,
    }
  }, [scenario, input.adoptionIndex, input.realityLevel])

  const handleSaveHistory = () => {
    addToHistory({ ...input, createdAt: Date.now() })
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

  /* ══════ 摘要卡片数量（动态） ══════ */
  const summaryCards: { label: string; value: string; highlight?: boolean }[] = [
    { label: '初始投入', value: `¥${calculations.adoptionCost.toLocaleString()}` },
    { label: '首年基础', value: `¥${calculations.baseFirstYear.toLocaleString()}` },
  ]
  if (calculations.bufferFactor > 1) {
    summaryCards.push({
      label: `纠偏后预算 (×${calculations.bufferFactor.toFixed(2)})`,
      value: `¥${calculations.totalFirstYear.toLocaleString()}`,
      highlight: true,
    })
  } else {
    summaryCards.push({
      label: '首年总花费',
      value: `¥${calculations.totalFirstYear.toLocaleString()}`,
      highlight: true,
    })
  }
  summaryCards.push(
    { label: '满意度', value: `${calculations.satisfactionScore.toFixed(1)}/10` },
    { label: '周投入时间', value: `${Math.round(calculations.adjustedWeeklyHours)}h` }
  )
  if (calculations.depreciationTotal > 0) {
    summaryCards.push({ label: '年折旧损耗', value: `¥${calculations.depreciationTotal.toLocaleString()}` })
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
      <div className={`grid gap-4 ${summaryCards.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}`}>
        {summaryCards.map((card, i) => (
          <SummaryCard
            key={card.label}
            label={card.label}
            value={card.value}
            color={scenario.color}
            delay={i * 0.08}
            highlight={card.highlight}
          />
        ))}
      </div>

      {/* ══════ 3.5 视觉隐喻 ══════ */}
      <VisualMetaphor
        totalFirstYear={calculations.totalFirstYear}
        adjustedWeeklyHours={calculations.adjustedWeeklyHours}
        color={scenario.color}
      />

      {/* ══════ 4. 对比基线（若存在） ══════ */}
      {scenario.comparisonBaseline && (
        <motion.div
          className="card-base p-5 border-dashed"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
            📊 对比基线：{scenario.comparisonBaseline.label}
          </h3>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="text-2xl font-bold font-display" style={{ color: scenario.color }}>
                ¥{scenario.comparisonBaseline.unitPrice}
                <span className="text-sm font-normal text-muted-foreground">
                  /{scenario.comparisonBaseline.unit}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {scenario.comparisonBaseline.description}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs text-muted-foreground">等效年代价</div>
              <div className="text-lg font-semibold font-display text-coral">
                ¥{calculations.baselineAnnual.toLocaleString()}
              </div>
              <div className="text-[10px] text-muted-foreground">
                vs 你的首年 ¥{calculations.totalFirstYear.toLocaleString()}
              </div>
              {calculations.totalFirstYear < calculations.baselineAnnual ? (
                <div className="text-xs text-sage font-medium mt-1">
                  ✅ 年节省 ¥{(calculations.baselineAnnual - calculations.totalFirstYear).toLocaleString()}
                </div>
              ) : calculations.baselineAnnual > 0 ? (
                <div className="text-xs text-coral/70 mt-1">
                  多投入是品质/体验的溢价
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════ 5. 进度条 ══════ */}
      <ProgressStepper scenario={scenario} />

      {/* ══════ 6. 交互图表 ══════ */}
      <InteractiveChart
        scenario={scenario}
        totalFirstYear={calculations.totalFirstYear}
        color={scenario.color}
      />

      {/* ══════ 7. 采用方式选择 ══════ */}
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

      {/* ══════ 8. 满意度雷达 ══════ */}
      <SatisfactionChart ratings={scenario.satisfactionRatings} color={scenario.color} />

      {/* ══════ 9. 时间投入 ══════ */}
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

      {/* ══════ 10. 费用明细（含折旧 + Tips） ══════ */}
      {scenario.sections.map((section, si) => (
        <ExpandableSection
          key={section.title}
          scenario={scenario}
          section={section}
          index={si}
          color={scenario.color}
        />
      ))}

      {/* ══════ 11. 折旧与纠偏汇总 ══════ */}
      {calculations.depreciationTotal > 0 && (
        <motion.div
          className="card-base p-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 font-display">📉 折旧与纠偏报告</h3>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-surface">
              <div className="text-xs text-muted-foreground mb-1">年度折旧损耗</div>
              <div className="text-2xl font-bold font-display text-coral">
                ¥{calculations.depreciationTotal.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                设备随时间贬值的年度成本
              </div>
            </div>
            <div className="p-4 rounded-xl bg-surface">
              <div className="text-xs text-muted-foreground mb-1">
                Buffer 纠偏系数（×{calculations.bufferFactor.toFixed(2)}）
              </div>
              <div className="text-2xl font-bold font-display text-honey">
                +¥{calculations.bufferAmount.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                预期落差缓冲——意外开支、学习成本、试错浪费
              </div>
            </div>
          </div>

          {/* 折旧明细 */}
          <div className="text-xs text-muted-foreground mb-2">
            各设备折旧明细（直线法）：
          </div>
          <div className="space-y-1">
            {calculations.depreciationItems.map((d) => (
              <div key={d.label} className="flex items-center justify-between p-2 rounded-lg bg-surface/50 text-xs">
                <span>{d.label}</span>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span>原值 ¥{d.original.toLocaleString()}</span>
                  <span>→ 年折旧 <span className="text-coral font-medium">¥{d.annualDep.toLocaleString()}</span></span>
                  <span className="text-[10px]">({d.lifespan}年寿命)</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 p-3 rounded-xl bg-primary/5 border border-primary/10 text-xs text-muted-foreground">
            💡 折旧是你为"拥有"付出的隐性成本。租赁或二手购买可以大幅降低折旧损失。{' '}
            {calculations.depreciationTotal > 5000 && '年折旧超¥5,000，建议评估"租用频率 vs 购买价值"。'}
          </div>
        </motion.div>
      )}

      {/* ══════ 12. 收益卡片 ══════ */}
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

      {/* ══════ 13. 知识卡片 ══════ */}
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

      {/* ══════ 14. 风险预警 ══════ */}
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

      {/* ══════ 15. 清单 ══════ */}
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

      {/* ══════ 16. 冷知识 ══════ */}
      <motion.div
        className="card-base p-5 bg-gradient-to-br from-surface to-card text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">冷知识</span>
        <p className="mt-2 text-sm italic text-muted-foreground">"{scenario.funFact}"</p>
      </motion.div>

      {/* ══════ 17. 未来预演 ══════ */}
      <FuturePreview
        scenario={scenario}
        totalFirstYear={calculations.totalFirstYear}
        adjustedWeeklyHours={calculations.adjustedWeeklyHours}
        satisfactionScore={calculations.satisfactionScore}
        baselineAnnual={calculations.baselineAnnual}
        color={scenario.color}
      />

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

/* ════════════════════════════════════════════
 *  子组件
 * ════════════════════════════════════════════ */

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
  color,
}: {
  scenario: ScenarioConfig
  section: ScenarioConfig['sections'][number]
  index: number
  color: string
}) {
  const [open, setOpen] = useState(false)
  const [activeTip, setActiveTip] = useState<CostTip | null>(null)

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
            <div className="px-5 pb-4 space-y-1">
              {section.items.map((item) => (
                <CostItemRow
                  key={item.label}
                  item={item}
                  color={color}
                  onTipClick={(tip) =>
                    setActiveTip(activeTip?.title === tip.title ? null : tip)
                  }
                  isTipActive={activeTip?.title === item.tip?.title}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function CostItemRow({
  item,
  color,
  onTipClick,
  isTipActive,
}: {
  item: CostItem
  color: string
  onTipClick: (tip: CostTip) => void
  isTipActive: boolean
}) {
  const showDep = item.depreciationRate && item.lifespan && item.frequency === 'once'
  const annualDep = showDep ? Math.round(item.amount * item.depreciationRate!) : 0

  return (
    <div>
      <div className="flex justify-between items-center py-2.5 border-t border-border/40">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm">{item.label}</span>
          {item.note && (
            <span className="text-[10px] text-muted-foreground">({item.note})</span>
          )}
          {item.tip && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onTipClick(item.tip!)
              }}
              className={`text-xs w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                isTipActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary'
              }`}
              title="查看科普"
            >
              💡
            </button>
          )}
        </div>
        <div className="text-right shrink-0 ml-4">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-mono font-medium">¥{item.amount.toLocaleString()}</span>
            <span className="text-[10px] text-muted-foreground">
              /{item.frequency === 'once' ? '次' : item.frequency === 'monthly' ? '月' : item.frequency === 'weekly' ? '周' : '年'}
            </span>
          </div>
          {showDep && (
            <div className="text-[10px] text-muted-foreground">
              年折旧 <span className="text-coral/70">¥{annualDep.toLocaleString()}</span>
              {' · '}{item.lifespan}年寿命
            </div>
          )}
        </div>
      </div>

      {/* Tips 弹窗 */}
      <AnimatePresence>
        {isTipActive && item.tip && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mx-2 mb-2 p-3 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 border border-primary/10">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-sm">💡</span>
                <div>
                  <div className="text-xs font-semibold">{item.tip.title}</div>
                  {item.tip.riskLevel && (
                    <span
                      className={`inline-block mt-0.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                        item.tip.riskLevel === 'high'
                          ? 'bg-coral/10 text-coral'
                          : item.tip.riskLevel === 'medium'
                            ? 'bg-honey/10 text-honey'
                            : 'bg-sage/10 text-sage'
                      }`}
                    >
                      {item.tip.riskLevel === 'high' ? '高风险注意' : item.tip.riskLevel === 'medium' ? '中风险提示' : '低风险参考'}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.tip.content}
              </p>
              {item.tip.emotionalValue && (
                <div className="mt-2 text-[11px] italic text-foreground/60 border-l-2 border-primary/30 pl-2.5">
                  {item.tip.emotionalValue}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
