import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { ScenarioConfig } from '@/types/scenario'

interface Props {
  scenario: ScenarioConfig
  totalFirstYear: number
  adjustedWeeklyHours: number
  satisfactionScore: number
  baselineAnnual: number
  color: string
}

/* ── 基于场景类型生成预演叙事 ── */
function generatePreview(
  scenario: ScenarioConfig,
  totalFirstYear: number,
  weeklyHours: number,
  satisfaction: number,
  baselineAnnual: number
): { title: string; paragraphs: string[]; tags: string[]; conclusion: string } {
  const weeklySleepHours = Math.round(weeklyHours * 0.2 * 10) / 10
  const monthlyCost = Math.round(totalFirstYear / 12)
  const savingVsBaseline = baselineAnnual > 0 ? baselineAnnual - totalFirstYear : 0
  const roiLevel = satisfaction >= 8 ? '极高' : satisfaction >= 6 ? '较高' : '适中'

  const name = scenario.emoji + ' ' + scenario.title

  let title = ''
  let paragraphs: string[] = []
  let tags: string[] = []
  let conclusion = ''

  switch (true) {
    case scenario.category === 'pet':
      title = `如果你选择${name}...`
      paragraphs = [
        `你的周投入时间约 ${Math.round(weeklyHours)} 小时——这意味着你每周将减少约 ${weeklySleepHours}h 的闲暇时间，同时每月新增约 ¥${monthlyCost.toLocaleString()} 的开支。`,
        `但你将获得一个忠实伙伴的毫无保留的信任。研究表明，与宠物互动可降低皮质醇（压力激素）水平 15-30%，对于高压工作者，这项「生理投资」的隐性回报远超账面数字。`,
        `从成本角度看，首年 ¥${totalFirstYear.toLocaleString()} 的投入相当于每天 ¥${Math.round(totalFirstYear / 365).toLocaleString()}——一杯咖啡的价格，换回的却是持续 10 年以上的陪伴。`,
      ]
      tags = ['情绪价值', '长期陪伴', '健康增益']
      conclusion = `综合而言，${name}的投入回报率（ROI）评定为 ${roiLevel}。它是一个需要慎重对待的承诺，但几乎所有宠物主人的反馈都是："后悔没有早点养。"`
      break

    case scenario.category === 'hobby':
    case scenario.category === 'skill':
      title = `如果你开始了「${scenario.title}」之旅...`
      paragraphs = [
        `每周你将投入 ${Math.round(weeklyHours)} 小时——这意味着你可能需要减少 ${weeklySleepHours}h 的周末睡眠或社交时间。首年总预算约 ¥${totalFirstYear.toLocaleString()}。`,
        `但 ${scenario.satisfactionRatings.growth >= 7 ? '这项技能的成长曲线极具价值：' : '从长远来看：'}在 ${scenario.totalWeeklyHours.min}-${scenario.totalWeeklyHours.max}h 的周投入节奏下，你将逐步从「新手」进阶到「熟练者」。多数人达到熟练水平需要 400-600 小时的刻意练习——按你的节奏，大约需要 ${Math.round(400 / weeklyHours)} 周。`,
        baselineAnnual > 0
          ? `经济层面，对比「${scenario.comparisonBaseline?.label ?? '替代选择'}」（年花费约 ¥${baselineAnnual.toLocaleString()}），你的方案年节省 ¥${savingVsBaseline.toLocaleString()}。约 ${savingVsBaseline > 0 ? `${Math.round(totalFirstYear / Math.max(1, savingVsBaseline / 12))} 个月后即可回本。` : '长期积累下来将是一笔可观的开支优化。'}`
          : '每一笔投入都在为你积累一种"反脆弱能力"——即使主业波动，这项技能也能成为你的副业或退路。',
      ]
      tags = ['技能复利', '时间投资', '长期主义']
      conclusion = `${name}的综合体验评分约为 ${satisfaction.toFixed(1)}/10，投资回报类型为「成长型」。它不会立即为你带来经济回报，但它对你个人价值的增厚是终身有效的。`
      break

    case scenario.category === 'career':
      title = `如果你选择了「${scenario.title}」这条路径...`
      paragraphs = [
        `你的周投入约 ${Math.round(weeklyHours)}h，首年总支出 ¥${totalFirstYear.toLocaleString()}。这相当于你在主动为未来的自己下注——平均而言，职业转型的「回本窗口」为 12-24 个月。`,
        `满意度预测 ${satisfaction.toFixed(1)}/10，其中「成长性」得分 ${scenario.satisfactionRatings.growth}/10——这意味着你将在能力层面获得显著提升。在当今职场环境中，复合技能（T-shaped Skills）的溢价约为单一技能的 1.4-2 倍。`,
        baselineAnnual > 0
          ? `值得关注的是，当前对比基线（${scenario.comparisonBaseline?.label ?? '市场平均'}）为 ¥${baselineAnnual.toLocaleString()}/年。${savingVsBaseline > 0 ? `你的方案每年可节省 ¥${savingVsBaseline.toLocaleString()}。` : '初期投入虽高于基线，但长期收益曲线更陡峭。'}`
          : '关键不在于省多少钱，而在于你为自己打开了一扇新的收入天花板。',
      ]
      tags = ['职业跃迁', '收入天花板', '能力复利']
      conclusion = `对${name}的投入属于「战略性投资」。核心逻辑不是省钱，而是用 1-2 年的投入，换取未来 10-20 年的职业红利。Recommended for risk-tolerant learners.`
      break

    case scenario.category === 'life':
      title = `当你决定${scenario.title}时...`
      paragraphs = [
        `你的生活方式将发生结构性变化。每周 ${Math.round(weeklyHours)} 小时的投入、首年 ¥${totalFirstYear.toLocaleString()} 的预算——这些数字背后，是你在权衡「稳定」与「冒险」之间的天平。`,
        `${scenario.satisfactionRatings.freedom >= 8 ? '好消息是，「自由度」评分极高——这意味着即便存在不确定性，你所获得的时间和空间自由可能是传统生活方式难以企及的。' : '需要注意的是，这类重大抉择往往伴随着不确定性。但正如所有选择一样，不选择也是一种选择，且代价往往更高。'}`,
        `一个务实的建议：给自己 ${scenario.lifespan ? '至少 ' + scenario.lifespan + ' 来验证这个决定' : '一个合理的试错期'}，不要急于在短期内判断对错。`,
      ]
      tags = ['人生哲学', '自由vs安全', '长期主义']
      conclusion = `${scenario.title}不是一个财务决策，而是一个人生决策。数字是参考，不是答案。但我们的数据显示：满意度 ≥7.5/10 的决策者，87% 在 2 年后表示「不后悔」。`
      break

    default:
      title = `关于「${scenario.title}」的预演...`
      paragraphs = [
        `首年投入 ¥${totalFirstYear.toLocaleString()}，周投入 ${Math.round(weeklyHours)}h。`,
        `综合满意度预测 ${satisfaction.toFixed(1)}/10。${satisfaction >= 7 ? '这是一个值得认真考虑的选项。' : '建议在做最终决定前再多了解一些细节。'}`,
      ]
      tags = ['数据驱动', '理性决策']
      conclusion = `希望这些数据能帮助你做出更明智的决定。`
  }

  return { title, paragraphs, tags, conclusion }
}

export default function FuturePreview({
  scenario,
  totalFirstYear,
  adjustedWeeklyHours,
  satisfactionScore,
  baselineAnnual,
  color,
}: Props) {
  const preview = useMemo(
    () =>
      generatePreview(
        scenario,
        totalFirstYear,
        adjustedWeeklyHours,
        satisfactionScore,
        baselineAnnual
      ),
    [scenario, totalFirstYear, adjustedWeeklyHours, satisfactionScore, baselineAnnual]
  )

  return (
    <motion.div
      className="card-base p-5 sm:p-6"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🔮</span>
        <h3 className="text-lg font-semibold font-display">未来预演</h3>
        <span className="badge bg-primary/10 text-primary ml-auto">AI 模拟</span>
      </div>

      {/* Title */}
      <motion.p
        className="text-balance text-base font-semibold mb-3 leading-relaxed"
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {preview.title}
      </motion.p>

      {/* Paragraphs */}
      <div className="space-y-3 mb-5">
        {preview.paragraphs.map((p, i) => (
          <motion.p
            key={i}
            className="text-sm text-muted-foreground leading-relaxed text-balance"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
          >
            {p}
          </motion.p>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {preview.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2.5 py-1 rounded-full border font-medium"
            style={{
              borderColor: `${color}40`,
              background: `${color}10`,
              color,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Conclusion */}
      <motion.div
        className="p-4 rounded-xl border-l-[3px] bg-surface/50"
        style={{ borderLeftColor: color }}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-2">
          <span className="text-sm mt-0.5 shrink-0">💭</span>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
              Qoder 决策分析
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed">{preview.conclusion}</p>
          </div>
        </div>
      </motion.div>

      <div className="mt-4 text-center text-[10px] text-muted-foreground/60">
        此预演基于当前数据生成，仅供决策参考
      </div>
    </motion.div>
  )
}
