import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getScenarioBySlug } from '@/config'
import CalculatorEngine from '@/engine/CalculatorEngine'

export default function ScenarioPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>()
  const scenario = slug ? getScenarioBySlug(slug) : undefined

  if (!scenario) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-xl font-semibold mb-2">场景未找到</h2>
        <Link to="/" className="text-primary hover:underline text-sm">
          返回首页
        </Link>
      </div>
    )
  }

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

      {/* ── Hero ── */}
      <motion.div
        className="card-base p-6 sm:p-8 mb-8 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ background: `radial-gradient(circle at 50% 0%, ${scenario.color}, transparent 70%)` }}
        />
        <div className="relative z-10">
          <div className="text-4xl sm:text-5xl mb-4">{scenario.emoji}</div>
          <h1 className="text-2xl sm:text-4xl font-bold font-display mb-3">
            {scenario.title}
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-lg mx-auto mb-4">
            {scenario.description}
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs">
            {scenario.lifespan && (
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-surface">
                ⏳ {scenario.lifespan}
              </span>
            )}
            <span className="px-2.5 sm:px-3 py-1 rounded-full bg-surface">
              📊 难度: {scenario.difficulty}
            </span>
            {scenario.space && (
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-surface">
                📐 {scenario.space}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Calculator Engine ── */}
      <CalculatorEngine scenario={scenario} />
    </div>
  )
}
