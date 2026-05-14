/* ────────────────────────────────────────────
 *  场景配置核心类型
 *  Universal Life Decision & Budget Simulator
 * ──────────────────────────────────────────── */

export type ScenarioCategory = 'pet' | 'hobby' | 'career' | 'skill' | 'life'

export interface AdoptionOption {
  id: string
  label: string
  priceRange: [number, number]
  description: string
}

/* ── 知识科普 Tips ── */
export interface CostTip {
  title: string
  content: string
  riskLevel?: 'low' | 'medium' | 'high'
  emotionalValue?: string
}

/* ── 对比基线 ── */
export interface ComparisonBaseline {
  label: string
  unitPrice: number
  unit: string
  description: string
}

export interface CostItem {
  label: string
  amount: number
  frequency: 'once' | 'monthly' | 'yearly' | 'weekly'
  note?: string
  depreciationRate?: number
  lifespan?: number
  tip?: CostTip
}

export interface CostSection {
  title: string
  icon: string
  items: CostItem[]
  totalRange?: [number, number]
}

export interface TimeDimension {
  label: string
  hoursPerWeek: [number, number]
  icon: string
  description?: string
}

export interface SatisfactionRatings {
  joy: number
  growth: number
  social: number
  freedom: number
  meaning: number
  convenience: number
}

export interface BenefitCard {
  title: string
  description: string
  icon: string
  impact: 'high' | 'medium' | 'low'
}

export interface KnowledgeCard {
  title: string
  content: string
  icon: string
  tip?: string
}

export interface RiskItem {
  risk: string
  probability: 'high' | 'medium' | 'low'
  mitigation: string
}

export interface ScenarioConfig {
  id: string
  category: ScenarioCategory
  slug: string
  title: string
  emoji: string
  description: string
  tagline: string
  color: string
  lifespan?: string
  difficulty: string
  space?: string
  adoption?: AdoptionOption[]
  sections: CostSection[]
  timeInvestment: TimeDimension[]
  totalWeeklyHours: { min: number; max: number }
  satisfactionRatings: SatisfactionRatings
  benefits: BenefitCard[]
  knowledgeCards: KnowledgeCard[]
  checklist: string[]
  risks?: RiskItem[]
  funFact: string
  bufferFactor?: number
  comparisonBaseline?: ComparisonBaseline
  depreciationTotal?: number
}

/* ── 用户输入 ── */
export interface ScenarioInput {
  scenarioId: string
  adoptionIndex?: number
  monthlyBudget?: number
  timeAvailable?: number
  realityLevel?: number
  notes?: string
  createdAt: number
}

/* ── 对比项 ── */
export interface ComparisonItem {
  scenarioId: string
  title: string
  emoji: string
  color: string
  totalFirstYear: number
  weeklyHours: number
  satisfactionScore: number
}

/* ── 分类组 ── */
export interface CategoryGroup {
  category: ScenarioCategory
  label: string
  emoji: string
  description: string
  color: string
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    category: 'pet',
    label: '宠物伴侣',
    emoji: '🐾',
    description: '探索与动物伙伴共同生活的可能性',
    color: 'hsl(12, 90%, 55%)',
  },
  {
    category: 'hobby',
    label: '兴趣爱好',
    emoji: '🎨',
    description: '用预算丈量热爱的价值',
    color: 'hsl(32, 95%, 55%)',
  },
  {
    category: 'career',
    label: '职业发展',
    emoji: '🚀',
    description: '投资未来的自己',
    color: 'hsl(150, 30%, 40%)',
  },
  {
    category: 'skill',
    label: '技能学习',
    emoji: '📚',
    description: '每一份投入都在为成长蓄力',
    color: 'hsl(45, 90%, 50%)',
  },
  {
    category: 'life',
    label: '人生大事',
    emoji: '🏠',
    description: '模拟重大人生决策',
    color: 'hsl(12, 65%, 50%)',
  },
]
