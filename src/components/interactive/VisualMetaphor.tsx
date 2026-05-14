import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  totalFirstYear: number
  adjustedWeeklyHours: number
  color: string
}

interface MetaphorItem {
  emoji: string
  label: string
  count: number
  unit: string
  singular: string
  note: string
}

const HOURLY_WAGE = 60 // 默认时薪 ¥60/h
const BUBBLE_TEA_PRICE = 16 // 一杯奶茶 ¥16
const SUBWAY_RIDE = 5 // 一次地铁 ¥5
const MOVIE_TICKET = 65 // 一张电影票 ¥65
const GYM_MONTHLY = 300 // 一个月健身房 ¥300

export default function VisualMetaphor({ totalFirstYear, adjustedWeeklyHours, color }: Props) {
  const [wage, setWage] = useState(HOURLY_WAGE)
  const [editing, setEditing] = useState(false)

  const metaphors: MetaphorItem[] = useMemo(() => {
    const workHours = Math.round(totalFirstYear / wage)
    const workDays = Math.round(workHours / 8)
    const teaCups = Math.round(totalFirstYear / BUBBLE_TEA_PRICE)
    const subwayRides = Math.round(totalFirstYear / SUBWAY_RIDE)
    const movies = Math.round(totalFirstYear / MOVIE_TICKET)
    const gyms = Math.round(totalFirstYear / GYM_MONTHLY)
    const yearsOfGym = (gyms / 12).toFixed(1)

    return [
      {
        emoji: '💼',
        label: '工作等价',
        count: workHours,
        unit: '小时',
        singular: '',
        note: `≈ ${workDays} 个工作日（时薪 ¥${wage}）`,
      },
      {
        emoji: '🧋',
        label: '奶茶指数',
        count: teaCups,
        unit: '杯',
        singular: '',
        note: `每天 1 杯能喝 ${(teaCups / 365).toFixed(1)} 年`,
      },
      {
        emoji: '🚇',
        label: '通勤换算',
        count: subwayRides,
        unit: '次',
        singular: '',
        note: `够你坐地铁通勤 ${Math.round(subwayRides / 2 / 260)} 年`,
      },
      {
        emoji: '🎬',
        label: '电影票',
        count: movies,
        unit: '张',
        singular: '',
        note: `每周一场能看 ${(movies / 52).toFixed(1)} 年`,
      },
      {
        emoji: '🏋️',
        label: '健身时间',
        count: gyms,
        unit: '月',
        singular: '',
        note: `≈ ${yearsOfGym} 年健身房会员`,
      },
    ]
  }, [totalFirstYear, wage])

  return (
    <motion.div
      className="card-base p-5 sm:p-6"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 }}
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h3 className="text-lg font-semibold font-display">🔮 视觉隐喻</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">换算时薪</span>
          {editing ? (
            <input
              type="number"
              value={wage}
              onChange={(e) => setWage(Number(e.target.value) || 1)}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
              autoFocus
              className="w-16 text-xs text-center py-1 rounded-md border border-primary bg-card font-mono focus:outline-none focus:ring-2 focus:ring-primary/30"
              min={10}
              max={5000}
            />
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-xs font-mono font-medium px-2 py-1 rounded-md bg-surface hover:bg-surface-hover transition-colors"
              style={{ color }}
            >
              ¥{wage}/h
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {metaphors.map((m, i) => (
          <motion.div
            key={m.label}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface/60 hover:bg-surface transition-colors group"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="text-2xl shrink-0 w-10 text-center">{m.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground mb-0.5">{m.label}</div>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-xl font-bold font-display"
                  style={{ color }}
                >
                  {m.count.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">{m.unit}</span>
              </div>
              <div className="text-[10px] text-muted-foreground/70 mt-0.5">{m.note}</div>
            </div>
            {/* Mini progress bar */}
            <div className="hidden sm:block w-20 shrink-0">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${Math.min(100, (m.count / metaphors[0].count) * 100)}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-xl bg-primary/3 border border-primary/10 text-center text-xs text-muted-foreground">
        💡 数字本身没有温度，但换算成「{metaphors[0].count.toLocaleString()} 小时的工作」或
        「{metaphors[1].count.toLocaleString()} 杯奶茶」后，你更容易感受到这份投入的分量。
      </div>
    </motion.div>
  )
}
