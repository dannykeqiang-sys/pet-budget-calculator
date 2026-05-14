import { Link } from 'react-router-dom'
import type { ScenarioConfig } from '@/types/scenario'
import { motion } from 'framer-motion'

interface Props {
  scenario: ScenarioConfig
}

export default function ScenarioCard({ scenario }: Props) {
  return (
    <motion.div
      className="card-base p-5 h-full group cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
          {scenario.emoji}
        </div>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
          style={{
            background: `${scenario.color}15`,
            color: scenario.color,
          }}
        >
          {scenario.difficulty}
        </span>
      </div>
      <h3 className="font-semibold text-sm mb-1">{scenario.title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2">{scenario.description}</p>
      <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>⭐ {(Object.values(scenario.satisfactionRatings).reduce((a, b) => a + b, 0) / 6).toFixed(1)}</span>
          <span>⏱️ {scenario.totalWeeklyHours.min}-{scenario.totalWeeklyHours.max}h</span>
        </div>
        <span className="text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          探索 →
        </span>
      </div>
    </motion.div>
  )
}
