import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  value: number // 1(打工人) - 10(理想)
  onChange: (v: number) => void
  scenarioTitle: string
}

const MILESTONES = [
  { value: 1, label: '打工人现状', emoji: '😮‍💨', desc: '时间紧张，预算有限' },
  { value: 3, label: '勉强平衡', emoji: '😐', desc: '挤出时间，精打细算' },
  { value: 5, label: '理性规划', emoji: '🤔', desc: '有预算，时间规划中' },
  { value: 7, label: '从容投入', emoji: '😊', desc: '时间充裕，预算充足' },
  { value: 10, label: '理想生活', emoji: '🌟', desc: '自由支配，尽情投入' },
]

export default function RealitySlider({ value, onChange, scenarioTitle }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const currentMilestone = MILESTONES.reduce((prev, curr) =>
    Math.abs(curr.value - value) < Math.abs(prev.value - value) ? curr : prev
  )

  const getSliderValue = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return value
      const rect = sliderRef.current.getBoundingClientRect()
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      return Math.round(pct * 9) + 1
    },
    [value]
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    onChange(getSliderValue(e.clientX))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    onChange(getSliderValue(e.touches[0].clientX))
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      onChange(getSliderValue(clientX))
    }

    const handleEnd = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleMove)
    window.addEventListener('touchend', handleEnd)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, getSliderValue, onChange])

  const pct = ((value - 1) / 9) * 100

  /* ── 时间/难度因子 ── */
  const timeAdjust = ((value - 5) * -2).toFixed(1)
  const difficultyAdjust = ((value - 5) * -0.15).toFixed(1)

  return (
    <motion.div
      className="card-base p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── 标题 ── */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold font-display">🌓 现实校准器</h3>
        <span className="text-xs text-muted-foreground">滑动调整当前生活状态</span>
      </div>

      {/* ── 滑块区域 ── */}
      <div
        ref={sliderRef}
        className="relative h-14 rounded-2xl cursor-pointer select-none mb-5 overflow-hidden"
        style={{
          background: `linear-gradient(90deg, 
            hsl(var(--muted)) 0%, 
            hsl(var(--muted)) ${pct * 0.3}%, 
            hsl(var(--primary) / 0.15) ${pct * 0.6}%, 
            hsl(var(--primary) / 0.4) ${pct}%, 
            hsl(var(--primary) / 0.2) 100%)`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* ── 轨道刻度 ── */}
        <div className="absolute inset-0 flex items-end pb-2 px-2 justify-between">
          {MILESTONES.filter((_, i) => i % 2 === 0).map((m) => (
            <div
              key={m.value}
              className="text-[10px] text-muted-foreground/40 transition-colors duration-300"
              style={{
                color: Math.abs(m.value - value) < 1.5 ? 'hsl(var(--foreground) / 0.6)' : undefined,
              }}
            >
              {m.emoji}
            </div>
          ))}
        </div>

        {/* ── 拖拽手柄 ── */}
        <motion.div
          className="absolute top-1 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center text-lg border-2 z-10"
          style={{ left: `calc(${pct}% - 24px)` }}
          animate={{
            scale: isDragging ? 1.15 : 1,
            borderColor: isDragging ? 'hsl(var(--primary))' : 'hsl(var(--border))',
            boxShadow: isDragging
              ? '0 0 24px hsl(var(--primary) / 0.4)'
              : '0 4px 12px rgba(0,0,0,0.1)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {currentMilestone.emoji}
        </motion.div>

        {/* ── 左右标注 ── */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground/50 pointer-events-none">
          😮‍💨 打工人
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground/50 pointer-events-none">
          理想生活 🌟
        </div>
      </div>

      {/* ── 实时反馈 ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-4 p-4 rounded-xl bg-surface"
        >
          <div className="text-3xl shrink-0">{currentMilestone.emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{currentMilestone.label}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">
                Lv.{value}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{currentMilestone.desc}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-muted-foreground">
              时间预算{' '}
              <span className={Number(timeAdjust) > 0 ? 'text-sage' : 'text-coral'}>
                {Number(timeAdjust) >= 0 ? '+' : ''}
                {timeAdjust}h/周
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              实际难度{' '}
              <span className={Number(difficultyAdjust) < 0 ? 'text-sage' : 'text-coral'}>
                {Number(difficultyAdjust) >= 0 ? '+' : ''}
                {difficultyAdjust}x
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── 场景适配提示 ── */}
      <motion.p
        className="text-xs text-muted-foreground text-center mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="font-medium">{scenarioTitle}</span> requires{' '}
        {value <= 3
          ? 'extra planning — 考虑降低期望或增加预算'
          : value <= 6
            ? 'balanced commitment — 保持节奏即可'
            : 'full immersion — 尽情享受！'}
      </motion.p>
    </motion.div>
  )
}
