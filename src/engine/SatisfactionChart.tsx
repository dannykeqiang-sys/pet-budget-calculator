import { motion } from 'framer-motion'
import type { SatisfactionRatings } from '@/types/scenario'
import { useStore } from '@/store/useStore'

interface Props {
  ratings: SatisfactionRatings
  color: string
}

const LABELS: { key: keyof SatisfactionRatings; label: string; emoji: string }[] = [
  { key: 'joy', label: '愉悦感', emoji: '😊' },
  { key: 'growth', label: '成长性', emoji: '📈' },
  { key: 'social', label: '社交性', emoji: '👥' },
  { key: 'freedom', label: '自由度', emoji: '🕊️' },
  { key: 'meaning', label: '意义感', emoji: '💡' },
  { key: 'convenience', label: '便利性', emoji: '⚡' },
]

export default function SatisfactionChart({ ratings, color }: Props) {
  const reduceMotion = useStore((s) => s.reduceMotion)

  return (
    <div className="card-base p-6">
      <h3 className="text-lg font-semibold mb-4 font-display">多维满意度雷达</h3>
      <div className="space-y-3">
        {LABELS.map(({ key, label, emoji }, i) => {
          const value = ratings[key]
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="text-sm w-8 text-right">{emoji}</span>
              <span className="text-sm text-muted-foreground w-14 shrink-0">{label}</span>
              <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color }}
                  initial={reduceMotion ? { width: `${value * 10}%` } : { width: 0 }}
                  whileInView={{ width: `${value * 10}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className="text-sm font-mono w-6 text-right font-medium">{value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
