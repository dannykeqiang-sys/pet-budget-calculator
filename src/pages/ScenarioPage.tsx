import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getScenarioBySlug } from '@/config'
import CalculatorEngine from '@/engine/CalculatorEngine'
import { useStore } from '@/store/useStore'

export default function ScenarioPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>()
  const scenario = slug ? getScenarioBySlug(slug) : undefined
  const history = useStore((s) => s.history)

  const historyCount = useMemo(
    () => history.filter((h) => h.scenarioId === scenario?.id).length,
    [history, scenario]
  )

  if (!scenario) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-xl font-semibold mb-2">场景未找到</h2>
        <p className="text-sm text-muted-foreground mb-4">请检查链接是否正确，或返回首页重新选择</p>
        <Link to="/" className="btn-primary text-sm">
          返回首页
        </Link>
      </div>
    )
  }

  const avgSatisfaction =
    Object.values(scenario.satisfactionRatings).reduce((a, b) => a + b, 0) / 6

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* ── Breadcrumb ── */}
      <motion.div
        className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Link to="/" className="hover:text-foreground transition-colors">
          首页
        </Link>
        <span>/</span>
        <span className="text-foreground">
          {scenario.emoji} {scenario.title}
        </span>
      </motion.div>

      {/* ════════════════════════════════════════════
       *  HERO — 场景概览
       * ════════════════════════════════════════════ */}
      <motion.div
        className="card-base p-6 sm:p-8 mb-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Radial gradient bg */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ background: `radial-gradient(circle at 50% 0%, ${scenario.color}, transparent 70%)` }}
        />

        <div className="relative z-10">
          {/* Title row */}
          <div className="flex items-start gap-4 sm:gap-5 mb-5 flex-wrap">
            <div className="text-4xl sm:text-5xl shrink-0">{scenario.emoji}</div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-4xl font-bold font-display mb-2">
                {scenario.title}
              </h1>
              <p className="text-muted-foreground text-sm max-w-lg">
                {scenario.description}
              </p>
              {scenario.tagline && (
                <p className="text-xs text-muted-foreground/60 italic mt-1">{scenario.tagline}</p>
              )}
            </div>
          </div>

          {/* Quick meta tags */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
            <span className="text-xs px-3 py-1.5 rounded-full bg-surface text-muted-foreground">
              📂 {scenario.category}
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-surface text-muted-foreground">
              📊 难度: {scenario.difficulty}
            </span>
            {scenario.lifespan && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-surface text-muted-foreground">
                ⏳ {scenario.lifespan}
              </span>
            )}
            {scenario.space && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-surface text-muted-foreground">
                📐 {scenario.space}
              </span>
            )}
            {historyCount > 0 && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                📝 已探索 {historyCount} 次
              </span>
            )}
          </div>

          {/* Key metrics preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
              className="p-3 rounded-xl text-center"
              style={{ background: `${scenario.color}08`, border: `1px solid ${scenario.color}15` }}
            >
              <div className="text-lg font-bold font-display" style={{ color: scenario.color }}>
                ¥{scenario.sections.reduce((sum, sec) => sum + sec.items.reduce((s, it) => {
                  switch (it.frequency) {
                    case 'monthly': return s + it.amount * 12
                    case 'weekly': return s + it.amount * 52
                    default: return s + it.amount
                  }
                }, 0), 0).toLocaleString()}+
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">预估首年花费</div>
            </div>
            <div
              className="p-3 rounded-xl text-center"
              style={{ background: `${scenario.color}08`, border: `1px solid ${scenario.color}15` }}
            >
              <div className="text-lg font-bold font-display" style={{ color: scenario.color }}>
                {scenario.totalWeeklyHours.min}-{scenario.totalWeeklyHours.max}h
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">预估周投入</div>
            </div>
            <div
              className="p-3 rounded-xl text-center"
              style={{ background: `${scenario.color}08`, border: `1px solid ${scenario.color}15` }}
            >
              <div className="text-lg font-bold font-display" style={{ color: scenario.color }}>
                {avgSatisfaction.toFixed(1)}/10
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">综合满意度</div>
            </div>
            <div
              className="p-3 rounded-xl text-center"
              style={{ background: `${scenario.color}08`, border: `1px solid ${scenario.color}15` }}
            >
              <div className="text-lg font-bold font-display" style={{ color: scenario.color }}>
                {scenario.knowledgeCards.length + scenario.benefits.length}
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">知识点 + 收益卡片</div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {scenario.benefits.slice(0, 3).map((b) => (
              <span
                key={b.title}
                className="text-[10px] px-2 py-1 rounded-full"
                style={{ background: `${scenario.color}10`, color: scenario.color }}
              >
                {b.icon} {b.title}
              </span>
            ))}
            {scenario.benefits.length > 3 && (
              <span className="text-[10px] px-2 py-1 rounded-full bg-surface text-muted-foreground">
                +{scenario.benefits.length - 3} 更多
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════
       *  CALCULATOR ENGINE
       * ════════════════════════════════════════════ */}
      <CalculatorEngine scenario={scenario} />
    </div>
  )
}
