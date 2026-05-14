import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORY_GROUPS } from '@/types/scenario'
import { allScenarios, searchScenarios } from '@/config'
import ScenarioCard from '@/components/scenario/ScenarioCard'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = search
    ? searchScenarios(search)
    : activeCategory
      ? allScenarios.filter((s) => s.category === activeCategory)
      : allScenarios

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* ── Hero ── */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4">
          <span className="gradient-text">人生决策模拟器</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          用数据丈量每一个选择，让每一份投入都有迹可循
        </p>
      </motion.div>

      {/* ── 搜索栏 ── */}
      <motion.div
        className="max-w-xl mx-auto mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              if (e.target.value) setActiveCategory(null)
            }}
            placeholder="🔍 搜索场景... 猫、潜水、编程、吉他..."
            className="w-full px-5 py-3.5 rounded-2xl bg-card border border-border text-sm placeholder:text-muted-foreground/50 
                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                       transition-all duration-300"
          />
        </div>
      </motion.div>

      {/* ── 分类标签 ── */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => { setActiveCategory(null); setSearch('') }}
          className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
            !activeCategory && !search
              ? 'bg-primary text-primary-foreground font-medium shadow-soft'
              : 'bg-muted text-muted-foreground hover:bg-surface-hover'
          }`}
        >
          🌐 全部
        </button>
        {CATEGORY_GROUPS.map((group) => (
          <button
            key={group.category}
            onClick={() => { setActiveCategory(group.category); setSearch('') }}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              activeCategory === group.category
                ? 'bg-primary text-primary-foreground font-medium shadow-soft'
                : 'bg-muted text-muted-foreground hover:bg-surface-hover'
            }`}
          >
            {group.emoji} {group.label}
          </button>
        ))}
      </div>

      {/* ── 场景卡片网格 ── */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((scenario, i) => (
            <motion.div
              key={scenario.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Link to={`/scenario/${scenario.category}/${scenario.slug}`}>
                <ScenarioCard scenario={scenario} />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-muted-foreground">没有找到匹配的场景</p>
            <p className="text-sm text-muted-foreground/60 mt-1">试试其他关键词</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
