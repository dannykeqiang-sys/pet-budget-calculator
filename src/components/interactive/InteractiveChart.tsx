import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
  Legend,
  Area,
  ComposedChart,
} from 'recharts'
import type { ScenarioConfig } from '@/types/scenario'

interface Props {
  scenario: ScenarioConfig
  totalFirstYear: number
  color: string
}

interface YearData {
  year: number
  cost: number
  cumulative: number
  roi: number
  roiRatio: number
  satisfaction: number
}

export default function InteractiveChart({ scenario, totalFirstYear, color }: Props) {
  const [highlightMode, setHighlightMode] = useState<'roi' | 'emotion' | 'none'>('none')

  /* ── 模拟 1-5 年数据 ── */
  const chartData: YearData[] = useMemo(() => {
    const satisfactionDecay = scenario.category === 'pet' ? 0.05 : 0.03
    return Array.from({ length: 5 }, (_, i) => {
      const year = i + 1
      // 首年高(初始投入+运行)，之后逐年递减(优化/习惯)
      const yearCost =
        year === 1
          ? totalFirstYear
          : totalFirstYear * 0.5 * Math.pow(0.92, year - 2)
      const cumulative = (i === 0 ? 0 : chartDataCache[i - 1]?.cumulative ?? 0) + yearCost
      // ROI 简化模型：第1年-100%，第2年-60%...逐月回本
      const roi = i === 0 ? -1 : i === 1 ? -0.4 : i === 2 ? 0.15 : i === 3 ? 0.5 : 1.0
      const roiRatio = year === 1 ? 0 : year === 2 ? 0.3 : year === 3 ? 0.7 : year === 4 ? 1.2 : 1.8
      // 满意度：随时间推移略有变化
      const satisfaction =
        scenario.satisfactionRatings.joy -
        satisfactionDecay * (year - 1) * 0.5 +
        (year > 2 ? 1 : 0) // 长期投入后更深的连结
      return { year, cost: Math.round(yearCost), cumulative: Math.round(cumulative), roi, roiRatio, satisfaction: Math.round(satisfaction * 10) / 10 }
    })
  }, [totalFirstYear, scenario])

  // 缓存用于 cumulative 计算
  const chartDataCache = chartData

  /* ── 回本周期估算 ── */
  const breakEvenYear = chartData.findIndex((d) => d.cumulative > totalFirstYear * 2.5) + 1
  const emotionalDipYear = 3 // 情感衰减期通常在第三年

  return (
    <motion.div
      className="card-base p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h3 className="text-lg font-semibold font-display">
          📊 5年趋势预测
        </h3>
        <div className="flex gap-2">
          {([
            { key: 'none' as const, label: '基础', emoji: '📈' },
            { key: 'roi' as const, label: '回本周期', emoji: '💎' },
            { key: 'emotion' as const, label: '情感衰减', emoji: '💔' },
          ]).map((mode) => (
            <button
              key={mode.key}
              onClick={() => setHighlightMode(highlightMode === mode.key ? 'none' : mode.key)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                highlightMode === mode.key
                  ? 'border-primary bg-primary/10 text-primary font-medium'
                  : 'border-border text-muted-foreground hover:border-primary/30'
              }`}
            >
              {mode.emoji} {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 图表 ── */}
      <div className="h-[320px] -mx-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="satisfactionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--sage))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--sage))" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(v) => `第${v}年`}
              stroke="hsl(var(--border))"
            />
            <YAxis
              yAxisId="cost"
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(v) => `¥${(v / 1000).toFixed(0)}k`}
              stroke="hsl(var(--border))"
            />
            <YAxis
              yAxisId="score"
              orientation="right"
              domain={[0, 10]}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              stroke="hsl(var(--border))"
            />

            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                fontSize: '13px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
              formatter={(value: number, name: string) => {
                if (name === '年花费') return [`¥${value.toLocaleString()}`, name]
                if (name === '累积投入') return [`¥${value.toLocaleString()}`, name]
                if (name === 'ROI倍率') return [`${value.toFixed(1)}x`, name]
                if (name === '满意度') return [`${value}/10`, name]
                return [value, name]
              }}
            />

            {/* ── 高亮：ROI 回本周期 ── */}
            {highlightMode === 'roi' && breakEvenYear > 0 && breakEvenYear <= 5 && (
              <ReferenceArea
                yAxisId="cost"
                x1={1}
                x2={breakEvenYear}
                fill="hsl(var(--coral) / 0.08)"
                stroke="hsl(var(--coral) / 0.3)"
                strokeDasharray="4 4"
              />
            )}
            {highlightMode === 'roi' && (
              <ReferenceLine
                yAxisId="cost"
                x={breakEvenYear}
                stroke="hsl(var(--coral))"
                strokeWidth={2}
                label={{
                  value: `回本点 Y${breakEvenYear}`,
                  position: 'top',
                  fill: 'hsl(var(--coral))',
                  fontSize: 12,
                }}
              />
            )}

            {/* ── 高亮：情感衰减期 ── */}
            {highlightMode === 'emotion' && (
              <ReferenceArea
                yAxisId="score"
                x1={emotionalDipYear - 0.5}
                x2={emotionalDipYear + 0.5}
                fill="hsl(45 90% 50% / 0.1)"
                stroke="hsl(var(--honey) / 0.4)"
                strokeDasharray="4 4"
              />
            )}
            {highlightMode === 'emotion' && (
              <ReferenceLine
                yAxisId="score"
                x={emotionalDipYear}
                stroke="hsl(var(--honey))"
                strokeWidth={2}
                label={{
                  value: '情感衰减期',
                  position: 'top',
                  fill: 'hsl(var(--honey))',
                  fontSize: 12,
                }}
              />
            )}

            {/* 年花费面积图 */}
            <Area
              yAxisId="cost"
              type="monotone"
              dataKey="cost"
              fill="url(#costGradient)"
              stroke={color}
              strokeWidth={2.5}
              name="年花费"
              dot={{ r: 4, fill: color, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: '#fff' }}
            />

            {/* ROI 倍率曲线 */}
            {(highlightMode === 'roi' || highlightMode === 'none') && (
              <Line
                yAxisId="cost"
                type="monotone"
                dataKey="roiRatio"
                stroke="hsl(var(--coral))"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="ROI倍率"
                dot={{ r: 3, fill: 'hsl(var(--coral))' }}
              />
            )}

            {/* 满意度曲线 */}
            <Line
              yAxisId="score"
              type="monotone"
              dataKey="satisfaction"
              stroke="hsl(var(--sage))"
              strokeWidth={2.5}
              name="满意度"
              dot={{ r: 4, fill: 'hsl(var(--sage))', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, stroke: 'hsl(var(--sage))', strokeWidth: 2, fill: '#fff' }}
            />

            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
              formatter={(value: string) => (
                <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>
              )}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* ── 关键洞察 ── */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <InsightCard
          label="5年总投入"
          value={`¥${chartData[4].cumulative.toLocaleString()}`}
          color={color}
          emoji="💰"
        />
        <InsightCard
          label="预估回本周期"
          value={`第${breakEvenYear || '?'}年`}
          color="hsl(var(--coral))"
          emoji="📅"
        />
        <InsightCard
          label="长期满意度"
          value={`${chartData[4].satisfaction}/10`}
          color="hsl(var(--sage))"
          emoji="⭐"
        />
      </div>

      {/* ── 分析说明 ── */}
      <AnimatePresence mode="wait">
        {highlightMode !== 'none' && (
          <motion.div
            key={highlightMode}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-3 rounded-xl bg-surface text-xs text-muted-foreground">
              {highlightMode === 'roi' && (
                <div>
                  <span className="font-medium text-coral">💎 回本分析：</span>
                  预计第 <strong>{breakEvenYear}</strong> 年达到投资回报平衡点。此后每年的边际效益将超过投入成本。
                  {breakEvenYear <= 3
                    ? '这是一个回报周期较短的选择。'
                    : '需要有充足的心理准备进行长期投入。'}
                </div>
              )}
              {highlightMode === 'emotion' && (
                <div>
                  <span className="font-medium text-honey">💔 情感衰减预警：</span>
                  研究表明，重大决策带来的新鲜感通常在{' '}
                  <strong>第{emotionalDipYear}年</strong> 出现自然衰减。建议提前规划新的刺激点，
                  如深入学习、社交分享、或挑战更高目标来维持热情。
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function InsightCard({
  label,
  value,
  color,
  emoji,
}: {
  label: string
  value: string
  color: string
  emoji: string
}) {
  return (
    <motion.div
      className="p-3 rounded-xl bg-surface text-center"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-lg mb-1">{emoji}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-bold font-display mt-0.5" style={{ color }}>
        {value}
      </div>
    </motion.div>
  )
}
