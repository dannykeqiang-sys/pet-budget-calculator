import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ScenarioConfig } from '@/types/scenario'

interface Props {
  scenario: ScenarioConfig
}

interface SkillNode {
  id: string
  label: string
  emoji: string
  phase: '准备' | '入门' | '进阶' | '精通'
  description: string
  unlockedBy?: string[]
}

function generateSkillTree(scenario: ScenarioConfig): SkillNode[] {
  const base: SkillNode[] = [
    {
      id: 'research',
      label: '调研了解',
      emoji: '🔍',
      phase: '准备',
      description: `深入了解${scenario.title}的基本信息`,
    },
    {
      id: 'budget',
      label: '预算规划',
      emoji: '💰',
      phase: '准备',
      description: '制订详细的资金计划',
      unlockedBy: ['research'],
    },
    {
      id: 'prep',
      label: '准备启动',
      emoji: '🎯',
      phase: '入门',
      description: '完成必要的前期准备工作',
      unlockedBy: ['budget'],
    },
    {
      id: 'first-step',
      label: '迈出第一步',
      emoji: '🚶',
      phase: '入门',
      description: `正式开启${scenario.title}之旅`,
      unlockedBy: ['prep'],
    },
    {
      id: 'routine',
      label: '建立习惯',
      emoji: '📅',
      phase: '进阶',
      description: '形成稳定的日常节奏',
      unlockedBy: ['first-step'],
    },
    {
      id: 'optimize',
      label: '优化升级',
      emoji: '⚡',
      phase: '进阶',
      description: '找到更高效的路径',
      unlockedBy: ['routine'],
    },
    {
      id: 'master',
      label: '融会贯通',
      emoji: '🧘',
      phase: '精通',
      description: `在${scenario.title}中得心应手`,
      unlockedBy: ['optimize'],
    },
    {
      id: 'share',
      label: '分享传承',
      emoji: '🌟',
      phase: '精通',
      description: '将经验传递给更多人',
      unlockedBy: ['master'],
    },
  ]
  return base
}

const PHASE_COLORS: Record<string, string> = {
  '准备': 'hsl(var(--muted-foreground))',
  '入门': 'hsl(var(--coral))',
  '进阶': 'hsl(var(--warm))',
  '精通': 'hsl(var(--sage))',
}

const PHASE_BG: Record<string, string> = {
  '准备': 'hsl(var(--muted))',
  '入门': 'hsl(12 90% 55% / 0.1)',
  '进阶': 'hsl(32 95% 55% / 0.1)',
  '精通': 'hsl(150 30% 45% / 0.1)',
}

export default function ProgressStepper({ scenario }: Props) {
  const skillTree = generateSkillTree(scenario)
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set(['research']))

  const toggleNode = (id: string) => {
    setUnlocked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        // 只能从最后解锁的开始取消
        const lastUnlocked = Array.from(next).pop()
        if (lastUnlocked === id) {
          next.delete(id)
        }
      } else {
        // 检查前置条件
        const node = skillTree.find((n) => n.id === id)
        if (node?.unlockedBy) {
          const allPrereqsMet = node.unlockedBy.every((pre) => next.has(pre))
          if (allPrereqsMet) {
            next.add(id)
          }
        } else {
          next.add(id)
        }
      }
      return next
    })
  }

  const unlockedCount = unlocked.size
  const totalCount = skillTree.length
  const progress = Math.round((unlockedCount / totalCount) * 100)

  /* ── Dashboard 数据 ── */
  const phaseProgress = ['准备', '入门', '进阶', '精通'].map((phase) => {
    const nodes = skillTree.filter((n) => n.phase === phase)
    const done = nodes.filter((n) => unlocked.has(n.id)).length
    return { phase, done, total: nodes.length }
  })

  const currentPhase = phaseProgress.find((p) => p.done < p.total)?.phase ?? '精通'

  return (
    <motion.div
      className="card-base p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold font-display">
          🎮 技能树 · 进度 {progress}%
        </h3>
        <span className="text-xs text-muted-foreground">
          {unlockedCount}/{totalCount} 节点已解锁
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── 左：技能树 ── */}
        <div className="flex-1">
          <div className="relative">
            {/* 连线 */}
            <svg
              className="absolute inset-0 pointer-events-none z-0"
              style={{ width: '100%', height: '100%' }}
            >
              {skillTree.map((node, i) => {
                if (i === 0) return null
                const prevUnlocked = unlocked.has(skillTree[i - 1].id)
                const currUnlocked = unlocked.has(node.id)
                const lineColor = currUnlocked
                  ? 'hsl(var(--primary))'
                  : prevUnlocked
                    ? 'hsl(var(--primary) / 0.3)'
                    : 'hsl(var(--border))'

                const y1 = i * 60 - 30 + 28
                const y2 = (i + 1) * 60 - 30 + 28
                return (
                  <line
                    key={i}
                    x1="36"
                    y1={y1}
                    x2="36"
                    y2={y2}
                    stroke={lineColor}
                    strokeWidth={currUnlocked ? 2.5 : 1.5}
                    strokeDasharray={currUnlocked ? 'none' : '4 4'}
                  />
                )
              })}
            </svg>

            {/* 节点 */}
            <div className="space-y-0 relative z-10">
              {skillTree.map((node, i) => {
                const isUnlocked = unlocked.has(node.id)
                const canUnlock =
                  !isUnlocked &&
                  (node.unlockedBy?.every((pre) => unlocked.has(pre)) ?? true)
                const isLastUnlocked = isUnlocked && !unlocked.has(skillTree[i + 1]?.id ?? '')

                return (
                  <motion.div
                    key={node.id}
                    className="flex items-center gap-4 py-2 pl-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {/* 节点按钮 */}
                    <motion.button
                      onClick={() => toggleNode(node.id)}
                      className={`relative shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-xl border-2 transition-all duration-300 ${
                        isUnlocked
                          ? 'bg-primary/10 border-primary shadow-glow'
                          : canUnlock
                            ? 'bg-card border-primary/30 hover:border-primary hover:bg-primary/5 cursor-pointer'
                            : 'bg-muted border-border cursor-not-allowed opacity-50'
                      }`}
                      style={
                        isUnlocked
                          ? ({ '--glow-color': 'hsl(var(--primary) / 0.2)' } as React.CSSProperties)
                          : undefined
                      }
                      whileHover={canUnlock ? { scale: 1.08 } : {}}
                      whileTap={canUnlock ? { scale: 0.95 } : {}}
                      animate={
                        isLastUnlocked
                          ? {
                              boxShadow: [
                                '0 0 8px hsl(var(--primary) / 0.2)',
                                '0 0 20px hsl(var(--primary) / 0.5)',
                                '0 0 8px hsl(var(--primary) / 0.2)',
                              ],
                            }
                          : {}
                      }
                      transition={
                        isLastUnlocked
                          ? { repeat: Infinity, duration: 2, ease: 'easeInOut' }
                          : {}
                      }
                    >
                      {node.emoji}
                      {isUnlocked && (
                        <motion.div
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-sage rounded-full flex items-center justify-center text-[10px] text-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          ✓
                        </motion.div>
                      )}
                    </motion.button>

                    {/* 标签 */}
                    <div className={`flex-1 min-w-0 ${!isUnlocked && !canUnlock ? 'opacity-40' : ''}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{node.label}</span>
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full"
                          style={{
                            background: PHASE_BG[node.phase],
                            color: PHASE_COLORS[node.phase],
                          }}
                        >
                          {node.phase}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{node.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── 右：实时看板 (Dashboard) ── */}
        <div className="lg:w-72 shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={unlockedCount}
              className="card-base p-5 bg-gradient-to-br from-surface to-card sticky top-24"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h4 className="text-sm font-semibold mb-4 font-display">
                🏠 未来生活缩影
              </h4>

              {/* 总进度环 */}
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                      animate={{
                        strokeDashoffset: (2 * Math.PI * 42 * (100 - progress)) / 100,
                      }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-xl font-bold font-display">{progress}%</span>
                      <div className="text-[10px] text-muted-foreground">就绪</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 阶段进度 */}
              <div className="space-y-2 mb-4">
                {phaseProgress.map((p) => (
                  <div key={p.phase} className="flex items-center gap-2">
                    <span className="text-xs w-10 text-muted-foreground">{p.phase}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: PHASE_COLORS[p.phase] }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(p.done / Math.max(1, p.total)) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-xs font-mono w-8 text-right">
                      {p.done}/{p.total}
                    </span>
                  </div>
                ))}
              </div>

              {/* 状态描述 */}
              <div className="p-3 rounded-xl bg-surface text-xs">
                <div className="text-muted-foreground mb-1">当前阶段</div>
                <div className="font-semibold" style={{ color: PHASE_COLORS[currentPhase] }}>
                  {currentPhase}期
                </div>
                <div className="text-muted-foreground mt-1">
                  {progress === 0
                    ? '万事开头难，点击第一个节点开始！'
                    : progress === 100
                      ? `🎉 恭喜！你已完全掌握${scenario.title}！`
                      : progress < 30
                        ? '扎实的准备是成功的一半'
                        : progress < 60
                          ? '已经步入正轨，保持节奏'
                          : progress < 90
                            ? '关键时刻，即将迎来质变'
                            : '只差最后一步了！'}
                </div>
              </div>

              {/* 清单完成情况 */}
              <div className="mt-3">
                <div className="text-xs text-muted-foreground mb-2">清单就绪度</div>
                {scenario.checklist.slice(0, 4).map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 text-xs py-1 ${
                      progress > i * 25 ? 'text-foreground' : 'text-muted-foreground/50'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center text-[9px] ${
                        progress > i * 25
                          ? 'border-sage bg-sage/10 text-sage'
                          : 'border-border'
                      }`}
                    >
                      {progress > i * 25 ? '✓' : ''}
                    </div>
                    <span className="truncate">{item.length > 28 ? item.slice(0, 28) + '...' : item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
