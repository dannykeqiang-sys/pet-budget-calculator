import type { ScenarioConfig } from '@/types/scenario'

export const hobbyScenarios: ScenarioConfig[] = [
  {
    id: 'hobby-diving',
    category: 'hobby',
    slug: 'diving',
    title: '潜水',
    emoji: '🤿',
    description: '探索地球上71%的未知领域，获取OW/AOW执照',
    tagline: '每一次下潜，都是一次冥想',
    color: '#06b6d4',
    difficulty: '中等',
    adoption: [
      { id: 'local', label: '国内考证', priceRange: [3000, 6000], description: '三亚/深圳等地考OW' },
      { id: 'overseas', label: '东南亚考证', priceRange: [5000, 10000], description: '包含机票+住宿的考证套餐' },
    ],
    sections: [
      {
        title: '考证费用',
        icon: '📜',
        items: [
          { label: 'OW开放水域', amount: 3500, frequency: 'once' },
          { label: 'AOW进阶', amount: 3000, frequency: 'once' },
          { label: '教材/注册费', amount: 300, frequency: 'once' },
        ],
      },
      {
        title: '装备投入',
        icon: '🎒',
        items: [
          { label: '面镜+呼吸管', amount: 800, frequency: 'once' },
          { label: '潜水电脑表', amount: 2500, frequency: 'once' },
          { label: '湿衣', amount: 1500, frequency: 'once' },
          { label: '脚蹼', amount: 1200, frequency: 'once' },
          { label: 'BCD浮力装置', amount: 3000, frequency: 'once', note: '可先租后买' },
        ],
      },
      {
        title: '每次出行',
        icon: '✈️',
        items: [
          { label: '潜水套餐(日均)', amount: 500, frequency: 'weekly', note: '含气瓶+导潜' },
          { label: '机票住宿(次均)', amount: 5000, frequency: 'yearly' },
        ],
      },
    ],
    timeInvestment: [
      { label: '考证培训(OW 4天)', hoursPerWeek: [32, 40], icon: '📖' },
      { label: '每次潜水旅行', hoursPerWeek: [24, 48], icon: '🌊', description: '按季度算' },
      { label: '日常体能维持', hoursPerWeek: [2, 4], icon: '🏊' },
    ],
    totalWeeklyHours: { min: 2, max: 6 },
    satisfactionRatings: { joy: 10, growth: 8, social: 7, freedom: 6, meaning: 7, convenience: 3 },
    benefits: [
      { title: '极致宁静', description: '水下只有呼吸声，是最好的冥想环境', icon: '🧘', impact: 'high' },
      { title: '全球社区', description: '每个潜水目的地都有热情的本地潜友', icon: '🌍', impact: 'high' },
      { title: '身体重塑', description: '每天潜水消耗约400-600卡路里', icon: '💪', impact: 'medium' },
    ],
    knowledgeCards: [
      { title: '减压病', content: '上升过快导致体内氮气形成气泡，可能致命。牢记不超18m/min速度上升', icon: '⚠️', tip: '潜水前24小时不喝酒，保持充足水分' },
      { title: '中性浮力', content: '调整BCD中的空气量实现水中悬浮，这是潜水的核心技能', icon: '🎈' },
      { title: '海洋保护', content: '不做任何触碰海洋生物的行为，防晒霜选择reef-safe配方', icon: '🐠', tip: '参与Dive Against Debris海洋清洁行动' },
    ],
    checklist: [
      '完成体检，确保无心血管/呼吸系统疾病',
      '购买潜水保险 (DAN或等额旅游险)',
      '考证前试水一次体验潜 (Discovery Dive)',
      '学会耳压平衡技巧（阀式/法兰佐）',
      '记录每次潜水日志（深度/时间/气温/所见）',
    ],
    risks: [
      { risk: '耳压伤/中耳炎', probability: 'medium', mitigation: '感冒时不潜水，慢速下潜做耳压平衡' },
      { risk: '装备故障', probability: 'low', mitigation: '每次潜水前自检装备+潜伴交叉检查' },
    ],
    funFact: '世界上最长的一口气潜水记录是24分37秒（静态闭气），但休闲潜水一瓶气通常可持续45-60分钟。',
  },
  {
    id: 'hobby-photography',
    category: 'hobby',
    slug: 'photography',
    title: '摄影',
    emoji: '📸',
    description: '用镜头捕捉光影，从入门到享受创作的自由',
    tagline: '相机是时间的减速器',
    color: '#8b5cf6',
    difficulty: '低入门，高阶深无止境',
    adoption: [
      { id: 'entry', label: '入门套机', priceRange: [4000, 8000], description: 'APS-C机身+变焦镜头' },
      { id: 'enthusiast', label: '进阶全幅', priceRange: [15000, 30000], description: '全画幅机身+定焦/变焦组合' },
    ],
    sections: [
      {
        title: '器材投入',
        icon: '📷',
        items: [
          { label: '相机机身', amount: 8000, frequency: 'once' },
          { label: '标准变焦镜头', amount: 5000, frequency: 'once' },
          { label: '定焦镜头 (50/85mm)', amount: 3000, frequency: 'once' },
          { label: '三脚架', amount: 1000, frequency: 'once' },
          { label: '滤镜+储存卡', amount: 800, frequency: 'once' },
          { label: '摄影包', amount: 600, frequency: 'once' },
        ],
      },
      {
        title: '持续投入',
        icon: '💡',
        items: [
          { label: 'Lightroom/PS订阅', amount: 68, frequency: 'monthly' },
          { label: '在线课程/教程', amount: 500, frequency: 'yearly' },
          { label: '外拍出行', amount: 2000, frequency: 'yearly' },
        ],
      },
    ],
    timeInvestment: [
      { label: '外出拍摄', hoursPerWeek: [3, 8], icon: '📷' },
      { label: '后期修图', hoursPerWeek: [2, 5], icon: '💻' },
      { label: '学习提升', hoursPerWeek: [1, 3], icon: '📖' },
    ],
    totalWeeklyHours: { min: 6, max: 16 },
    satisfactionRatings: { joy: 9, growth: 8, social: 6, freedom: 8, meaning: 6, convenience: 5 },
    benefits: [
      { title: '观察力提升', description: '学会用光影和构图的眼光看世界', icon: '👁️', impact: 'high' },
      { title: '记录生活', description: '最好的照片是20年后还能让你微笑的那张', icon: '🖼️', impact: 'high' },
      { title: '社交货币', description: '好照片是朋友圈和社交媒体的硬通货', icon: '💎', impact: 'medium' },
    ],
    knowledgeCards: [
      { title: '曝光三角', content: '光圈(f值)、快门速度、ISO三者联动决定画面亮度与效果', icon: '🔺' },
      { title: '三分构图法', content: '将画面九宫格分割，主体放在交叉点上最自然悦目', icon: '🎯' },
      { title: 'RAW格式', content: '保留所有感光数据的未处理格式，后期空间远大于JPEG', icon: '📊', tip: '一张RAW约30-50MB，准备足够储存卡' },
    ],
    checklist: [
      '先租后买——用租赁平台试一周再决定',
      '学习三分法和曝光三角基础理论',
      '坚持每天一拍（哪怕只是手机）',
      '整理作品集（500px/LOFTER/图虫）',
      '加入本地摄影群，每周一次扫街',
    ],
    risks: [
      { risk: '器材无底洞', probability: 'high', mitigation: '设定预算上限，先学会用现有设备' },
      { risk: '三分钟热度', probability: 'medium', mitigation: '先买二手入门设备，培养习惯后再升级' },
    ],
    funFact: '人类眼睛的"等效焦距"约为22mm，视角约120度，但只有中央凹区域能看清楚——这就是为什么照片比我们想象的更窄。',
  },
  {
    id: 'hobby-guitar',
    category: 'hobby',
    slug: 'guitar',
    title: '吉他',
    emoji: '🎸',
    description: '从和弦到独奏，一把吉他承包一个乐队的快乐',
    tagline: '六根弦，一万种可能',
    color: '#ef4444',
    difficulty: '低门槛，高天花板',
    adoption: [
      { id: 'entry', label: '入门面单', priceRange: [500, 1500], description: '合板或面单吉他' },
      { id: 'advanced', label: '全单进阶', priceRange: [3000, 10000], description: '全单板吉他，音色饱满' },
    ],
    sections: [
      {
        title: '入门装备',
        icon: '🎸',
        items: [
          { label: '吉他', amount: 1000, frequency: 'once' },
          { label: '调音器/节拍器', amount: 100, frequency: 'once' },
          { label: '变调夹', amount: 50, frequency: 'once' },
          { label: '备用弦(套)', amount: 50, frequency: 'once' },
          { label: '琴包/琴架', amount: 200, frequency: 'once' },
        ],
      },
      {
        title: '持续学习',
        icon: '🎵',
        items: [
          { label: '线下课(月)', amount: 600, frequency: 'monthly', note: '每周1-2节' },
          { label: '线上课程/App', amount: 200, frequency: 'yearly' },
          { label: '乐谱/教材', amount: 150, frequency: 'yearly' },
        ],
      },
    ],
    timeInvestment: [
      { label: '日常练习', hoursPerWeek: [3, 7], icon: '🎸' },
      { label: '上课学习', hoursPerWeek: [1, 2], icon: '👨‍🏫' },
      { label: '乐理学习', hoursPerWeek: [1, 3], icon: '📚' },
    ],
    totalWeeklyHours: { min: 5, max: 12 },
    satisfactionRatings: { joy: 9, growth: 9, social: 7, freedom: 6, meaning: 6, convenience: 7 },
    benefits: [
      { title: '右脑开发', description: '演奏乐器是少数同时激活左右脑的活动', icon: '🧠', impact: 'high' },
      { title: '社交利器', description: '一把吉他就能点燃野餐/旅行的氛围', icon: '🔥', impact: 'high' },
      { title: '情绪出口', description: '音乐是最直接的情感表达方式', icon: '💭', impact: 'medium' },
    ],
    knowledgeCards: [
      { title: '茧期', content: '按弦手指会经历2-4周的疼痛期，之后形成老茧就不再疼了', icon: '🩹', tip: '每天15分钟比每周练2小时更有效' },
      { title: '开放和弦', content: 'C, G, Am, Em, F是吉他入门五大和弦，学会就能弹80%的流行歌曲', icon: '🎶' },
      { title: '爬格子', content: '每天10分钟爬格子练习，能显著提升手指灵活度和独立性', icon: '🪜' },
    ],
    checklist: [
      '前3个月找个老师纠正手型（防止坏习惯）',
      '每天至少练15分钟（哪怕只是爬格子）',
      '选一首最爱的歌作为第一个目标曲目',
      '加入吉他社群/论坛交流学习心得',
      '录下第一首完整弹唱，记录成长',
    ],
    risks: [
      { risk: '手指腱鞘炎', probability: 'low', mitigation: '练习前热身、不过度练习、正确手型' },
      { risk: '放弃期(3-6月)', probability: 'medium', mitigation: '找到合奏伙伴或加入课程保持动力' },
    ],
    funFact: '吉他的祖先是公元前1500年的鲁特琴(lute)，但现代钢弦吉他直到1850年才由C.F. Martin在宾夕法尼亚州发明。',
  },
]
