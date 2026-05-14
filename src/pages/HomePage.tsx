import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORY_GROUPS } from '@/types/scenario'
import { allScenarios, searchScenarios } from '@/config'
import ScenarioCard from '@/components/scenario/ScenarioCard'

const HOW_IT_WORKS = [
  {
    step: '01',
    emoji: '🔍',
    title: '选择场景',
    desc: '从 12 个真实生活场景中，找到你想探索的决策方向——养宠、转行、学技能、换生活方式。',
  },
  {
    step: '02',
    emoji: '📊',
    title: '调整参数',
    desc: '拖动现实滑块、输入预算和时间，系统自动计算折旧、纠偏系数，生成多维数据报告。',
  },
  {
    step: '03',
    emoji: '⚖️',
    title: '做出决策',
    desc: '对比多个方案，查看 AI 未来预演，用数据驱动的洞察做出更明智的人生选择。',
  },
]

const PLATFORM_FEATURES = [
  { icon: '🔄', title: '折旧计算', desc: '设备类投入自动计算直线折旧，看清拥有成本' },
  { icon: '📈', title: 'Buffer 纠偏', desc: '预期落差系数，让预算更接近真实支出' },
  { icon: '🔮', title: '未来预演', desc: 'AI 风格叙事，预览每个选择可能带来的生活变化' },
  { icon: '☕', title: '视觉隐喻', desc: '金额转工作小时/奶茶/地铁，让数字更有体感' },
  { icon: '📋', title: '分屏对比', desc: '两个方案并排比较，逐项胜负标记 + 智能推荐' },
  { icon: '📱', title: '全平台适配', desc: '支持深色模式，手机/平板/桌面完美响应式' },
]

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = search
    ? searchScenarios(search)
    : activeCategory
      ? allScenarios.filter((s) => s.category === activeCategory)
      : allScenarios

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* ════════════════════════════════════════════
       *  HERO
       * ════════════════════════════════════════════ */}
      <motion.div
        className="text-center mb-10 sm:mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-3 sm:mb-4">
          <span className="gradient-text">人生决策模拟器</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-lg max-w-xl mx-auto px-2 mb-4">
          用数据丈量每一个选择，让每一份投入都有迹可循
        </p>
        <p className="text-muted-foreground/60 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          养一只猫要花多少钱？转行编程值不值得？数字游民生活需要多少预算？<br className="hidden sm:block" />
          每个重大决策背后，都值得一次认真的数据推演。我们帮你把模糊的直觉，变成清晰的数字。
        </p>
      </motion.div>

      {/* ════════════════════════════════════════════
       *  HOW IT WORKS
       * ════════════════════════════════════════════ */}
      <motion.div
        className="mb-10 sm:mb-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium">三步开始</span>
          <h2 className="text-lg sm:text-xl font-semibold font-display mt-1">如何使用模拟器</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              className="card-base p-5 sm:p-6 text-center relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.04] text-6xl font-bold font-mono">
                {item.step}
              </div>
              <div className="relative z-10">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>
                <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════
       *  SEARCH + CATEGORY TAGS
       * ════════════════════════════════════════════ */}
      <motion.div
        className="max-w-xl mx-auto mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
            placeholder="🔍 搜索场景...（如：猫咪、潜水、自由职业）"
            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-card border border-border text-sm placeholder:text-muted-foreground/50
                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                       transition-all duration-300"
          />
        </div>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
        <button
          onClick={() => { setActiveCategory(null); setSearch('') }}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-300 ${
            !activeCategory && !search
              ? 'bg-primary text-primary-foreground font-medium shadow-soft'
              : 'bg-muted text-muted-foreground hover:bg-surface-hover'
          }`}
        >
          🌐 全部场景 ({allScenarios.length})
        </button>
        {CATEGORY_GROUPS.map((group) => {
          const count = allScenarios.filter((s) => s.category === group.category).length
          return (
            <button
              key={group.category}
              onClick={() => { setActiveCategory(group.category); setSearch('') }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-300 ${
                activeCategory === group.category
                  ? 'bg-primary text-primary-foreground font-medium shadow-soft'
                  : 'bg-muted text-muted-foreground hover:bg-surface-hover'
              }`}
            >
              {group.emoji} {group.label} ({count})
            </button>
          )
        })}
      </div>

      {/* ════════════════════════════════════════════
       *  SCENARIO CARDS GRID
       * ════════════════════════════════════════════ */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
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
            <p className="text-sm text-muted-foreground/60 mt-1">试试其他关键词，如「猫咪」「潜水」「自由职业」</p>
          </div>
        )}
      </motion.div>

      {/* ════════════════════════════════════════════
       *  PLATFORM FEATURES
       * ════════════════════════════════════════════ */}
      <motion.div
        className="mt-14 sm:mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium">功能亮点</span>
          <h2 className="text-lg sm:text-xl font-semibold font-display mt-1">不只是计算器</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {PLATFORM_FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="card-base p-4 sm:p-5 group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {feat.icon}
              </div>
              <h3 className="font-semibold text-xs sm:text-sm mb-1">{feat.title}</h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════
       *  BOTTOM CTA
       * ════════════════════════════════════════════ */}
      <motion.div
        className="mt-14 sm:mt-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="card-base p-6 sm:p-8 inline-block" style={{ background: 'var(--gradient-hero)' }}>
          <p className="text-sm text-muted-foreground mb-3">
            数据不会替你做决定，但它能让你更有底气地做出选择。
          </p>
          <p className="text-xs text-muted-foreground/60">
            目前覆盖 {allScenarios.length} 个场景 · {CATEGORY_GROUPS.length} 大分类 · 持续更新中
          </p>
        </div>
      </motion.div>
    </div>
  )
}
