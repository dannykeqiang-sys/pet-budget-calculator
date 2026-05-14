import type { ScenarioConfig } from '@/types/scenario'

export const careerScenarios: ScenarioConfig[] = [
  {
    id: 'career-freelance',
    category: 'career',
    slug: 'freelance',
    title: '自由职业',
    emoji: '🕊️',
    description: '从朝九晚五到自雇人生，用自由换自律',
    tagline: '你卖的不是时间，是解决问题的能力',
    color: '#10b981',
    difficulty: '高',
    adoption: [
      { id: 'slow', label: '渐进式', priceRange: [5000, 15000], description: '先兼职接单积累客户再辞职' },
      { id: 'full', label: '全职跳入', priceRange: [30000, 80000], description: '直接辞职，预留6个月生活费' },
    ],
    sections: [
      {
        title: '启动成本',
        icon: '🚀',
        items: [
          { label: '6个月生活储备金', amount: 50000, frequency: 'once' },
          { label: '设备升级', amount: 15000, frequency: 'once' },
          { label: '个人网站/作品集', amount: 3000, frequency: 'once' },
          { label: '工具订阅(年)', amount: 2000, frequency: 'yearly', note: 'Figma/Notion/GitHub等' },
        ],
      },
      {
        title: '运营开销',
        icon: '💼',
        items: [
          { label: '社保自缴(月)', amount: 2500, frequency: 'monthly' },
          { label: '商业保险(年)', amount: 5000, frequency: 'yearly' },
          { label: '会计代账(年)', amount: 3000, frequency: 'yearly' },
          { label: '办公空间(月)', amount: 1500, frequency: 'monthly', note: '共享办公/咖啡厅' },
        ],
      },
    ],
    timeInvestment: [
      { label: '项目交付', hoursPerWeek: [30, 50], icon: '💻' },
      { label: '客户沟通', hoursPerWeek: [5, 10], icon: '💬' },
      { label: '学习提升', hoursPerWeek: [3, 8], icon: '📚' },
      { label: '营销推广', hoursPerWeek: [2, 5], icon: '📣' },
    ],
    totalWeeklyHours: { min: 40, max: 73 },
    satisfactionRatings: { joy: 8, growth: 9, social: 4, freedom: 10, meaning: 8, convenience: 3 },
    benefits: [
      { title: '时间主权', description: '不再有通勤打卡，你决定何时何地工作', icon: '🗽', impact: 'high' },
      { title: '收入上限消失', description: '时薪的天花板是你自己，不是公司职级表', icon: '📈', impact: 'high' },
      { title: '多元化收入', description: '可同时服务多个客户，降低单点风险', icon: '🎯', impact: 'medium' },
    ],
    knowledgeCards: [
      { title: '定价策略', content: '不要按时薪定价——按项目价值定价。客户买的不是小时数，是结果', icon: '💎', tip: '至少报价为全职时薪的2-3倍' },
      { title: '社保自缴', content: '自由职业者可以灵活就业身份继续缴纳社保和公积金', icon: '🏦' },
      { title: '合同必备', content: '每次合作都要签合同，明确交付物、付款节点、修改次数上限', icon: '📋', tip: '推荐使用"法天使"等模板平台' },
    ],
    checklist: [
      '准备6个月以上的生活储备金',
      '至少在兼职状态下接满3个付费项目',
      '注册个体工商户/公司（了解税务优惠）',
      '建立个人品牌：作品集网站+社交账号',
      '购买商业保险（意外险+医疗险）',
    ],
    risks: [
      { risk: '收入不稳定', probability: 'high', mitigation: '多个客户分散风险+被动收入渠道' },
      { risk: '社交隔离', probability: 'medium', mitigation: '定期参加行业线下/加入共享办公' },
      { risk: '过度劳累', probability: 'high', mitigation: '设定每日工作上限，学会拒绝' },
    ],
    funFact: 'Upwork平台数据显示，Top 10%的自由职业者收入是Bottom 50%的30倍以上——自由职业的差距比职场更大。',
  },
  {
    id: 'career-coding',
    category: 'career',
    slug: 'coding',
    title: '转行编程',
    emoji: '👨‍💻',
    description: '从零开始学编程，开启科技行业的第二职业',
    tagline: '代码是21世纪的第二外语',
    color: '#3b82f6',
    difficulty: '高',
    adoption: [
      { id: 'self', label: '自学路线', priceRange: [0, 5000], description: '免费资源+少量付费课程' },
      { id: 'bootcamp', label: '培训班路线', priceRange: [15000, 40000], description: '全日制/业余制编程训练营' },
    ],
    sections: [
      {
        title: '学习投入',
        icon: '📚',
        items: [
          { label: '在线课程/会员', amount: 2000, frequency: 'once' },
          { label: '编程书籍', amount: 500, frequency: 'once' },
          { label: 'LeetCode会员(年)', amount: 1200, frequency: 'yearly' },
        ],
      },
      {
        title: '硬件工具',
        icon: '💻',
        items: [
          { label: '电脑(Mac/PC)', amount: 10000, frequency: 'once' },
          { label: '外接显示器', amount: 1500, frequency: 'once' },
          { label: '机械键盘/鼠标', amount: 800, frequency: 'once' },
        ],
      },
    ],
    timeInvestment: [
      { label: '系统学习', hoursPerWeek: [15, 25], icon: '📖' },
      { label: '项目实战', hoursPerWeek: [10, 20], icon: '🔨' },
      { label: '刷题/面试准备', hoursPerWeek: [5, 10], icon: '🧩' },
    ],
    totalWeeklyHours: { min: 30, max: 55 },
    satisfactionRatings: { joy: 7, growth: 10, social: 5, freedom: 8, meaning: 7, convenience: 7 },
    benefits: [
      { title: '高薪潜力', description: '初级前端/后端起薪12-18K，3年经验可达25K+', icon: '💵', impact: 'high' },
      { title: '远程友好', description: '编程是最适合远程办公的职业之一', icon: '🌍', impact: 'high' },
      { title: '可迁移技能', description: '写代码培养的逻辑思维能力终身受用', icon: '🧩', impact: 'medium' },
    ],
    knowledgeCards: [
      { title: '学习路线', content: '前端：HTML/CSS → JavaScript → React/Vue → Node.js。打好JS基础最重要', icon: '🗺️' },
      { title: '项目经验', content: '面试官最看重GitHub上实际项目，而非证书数量', icon: '📁', tip: '做3个完整项目：个人博客+电商demo+数据看板' },
      { title: '面试准备', content: '大厂面试 = 算法(30%) + 项目(40%) + 基础知识(20%) + 软技能(10%)', icon: '🎯' },
    ],
    checklist: [
      '选择一门语言深耕（JS/Python/Go 选一个）',
      '每天至少写1小时代码（手感比知识重要）',
      '搭建GitHub个人主页，持续提交绿点',
      '参加一次Hackathon或开源项目贡献',
      '准备3个月的生活费全职学习',
    ],
    risks: [
      { risk: '半途而废', probability: 'high', mitigation: '找到学习伙伴+设定阶段性目标奖励' },
      { risk: '简历石沉大海', probability: 'medium', mitigation: '先做作品集，注重内推而非海投' },
      { risk: 'AI替代焦虑', probability: 'low', mitigation: '培养系统设计+业务理解等AI难以替代的能力' },
    ],
    funFact: 'GitHub 2023统计显示，中国开发者已超过1000万，占全球开发者的约11%——但相比14亿人口，编程人才密度仍远低于美国。',
  },
  {
    id: 'career-language',
    category: 'career',
    slug: 'language',
    title: '学外语',
    emoji: '🗣️',
    description: '学习一门新语言，打开一个全新的世界',
    tagline: '学一门语言就是获得一个新灵魂',
    color: '#a855f7',
    difficulty: '中等',
    adoption: [
      { id: 'self', label: '自学', priceRange: [500, 3000], description: 'App+教材+免费资源' },
      { id: 'course', label: '报班系统学', priceRange: [8000, 20000], description: '线下/线上系统课程' },
    ],
    sections: [
      {
        title: '学习工具',
        icon: '📱',
        items: [
          { label: 'Duolingo Plus(年)', amount: 588, frequency: 'yearly' },
          { label: 'iTalki/Preply(月)', amount: 800, frequency: 'monthly', note: '每周2次外教课' },
          { label: '教材+练习册', amount: 300, frequency: 'once' },
          { label: '语言App/软件', amount: 200, frequency: 'once' },
        ],
      },
      {
        title: '沉浸投入',
        icon: '✈️',
        items: [
          { label: '语言交换聚会', amount: 0, frequency: 'monthly', note: '通常免费' },
          { label: '目标国家旅行(次)', amount: 10000, frequency: 'yearly', note: '2周沉浸式练习' },
        ],
      },
    ],
    timeInvestment: [
      { label: '每日学习', hoursPerWeek: [5, 10], icon: '📖' },
      { label: '外教课', hoursPerWeek: [1, 2], icon: '👨‍🏫' },
      { label: '听力沉浸', hoursPerWeek: [3, 7], icon: '🎧' },
    ],
    totalWeeklyHours: { min: 9, max: 19 },
    satisfactionRatings: { joy: 8, growth: 9, social: 7, freedom: 7, meaning: 7, convenience: 5 },
    benefits: [
      { title: '认知储备', description: '双语者患阿尔茨海默症的平均年龄推迟5年', icon: '🧠', impact: 'high' },
      { title: '职业加分', description: '薪资溢价10-15%（英语流利在中国职场）', icon: '💼', impact: 'high' },
      { title: '文化视野', description: '能用原语言理解电影/文学/歌曲的深层含义', icon: '🌏', impact: 'medium' },
    ],
    knowledgeCards: [
      { title: '输入假说', content: '语言习得的核心是多听多读可理解内容，而非死记硬背语法', icon: '🎯' },
      { title: '1000小时法则', content: 'FSI(美国外交学院)研究显示，汉语母语者学英语约需2200小时达到流利水平', icon: '⏱️' },
      { title: '影子跟读法', content: '听原声的同时跟读模仿，是提升口语语调最有效的方法', icon: '🎤', tip: '每天15分钟影子跟读 > 1小时默读' },
    ],
    checklist: [
      '设定明确目标（如：6个月能日常对话）',
      '每天至少30分钟，周末不中断',
      '找语言交换伙伴或外教每周2次对话',
      '看目标语言的电影/剧（先开中文字幕，再关掉）',
      '用Anki/Quizlet做间隔复习卡片',
    ],
    risks: [
      { risk: '学习中断', probability: 'high', mitigation: '用App设每日提醒+打卡奖励机制' },
      { risk: '哑巴外语', probability: 'medium', mitigation: '从第一天开始开口说，不要怕犯错' },
    ],
    funFact: '瑞典人平均会说3.2种语言，而全球人均只会1.5种——语言能力与国民人均GDP呈正相关。',
  },
]
