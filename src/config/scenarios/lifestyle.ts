import type { ScenarioConfig } from '@/types/scenario'

export const lifeScenarios: ScenarioConfig[] = [
  /* ════════════════════════════════════════════
   *  1. 数字游民 / 自由职业
   * ════════════════════════════════════════════ */
  {
    id: 'life-digital-nomad',
    category: 'life',
    slug: 'digital-nomad',
    title: '数字游民',
    emoji: '🌍',
    description:
      '告别固定工位，以世界为办公室。评估签证、生活成本、社交代价与收入预期',
    tagline: '用地理套利换时间，用自律换自由',
    color: '#6366f1',
    lifespan: '按年/按季规划',
    difficulty: '高',
    bufferFactor: 1.2,
    comparisonBaseline: {
      label: '国内一线城市平均工资',
      unitPrice: 15000,
      unit: '元/月',
      description: '对比北上广深平均税后月薪，衡量收入替代可行性',
    },
    adoption: [
      {
        id: 'asia',
        label: '东南亚路线',
        priceRange: [8000, 15000],
        description: '清迈/巴厘岛/胡志明市，生活成本低，签证友好',
      },
      {
        id: 'europe',
        label: '欧洲路线',
        priceRange: [18000, 35000],
        description: '里斯本/柏林/第比利斯，数字游民签证完善',
      },
    ],
    sections: [
      {
        title: '签证与法律',
        icon: '🛂',
        items: [
          {
            label: '数字游民签证申请',
            amount: 3000,
            frequency: 'yearly',
            depreciationRate: 1,
            lifespan: 1,
            tip: {
              title: '签证避坑指南',
              content:
                '爱沙尼亚、葡萄牙、克罗地亚已推出数字游民签证。注意月收入门槛（通常€2,500-€3,500），且大多不允许在当地受雇。泰国/越南的"灰色长住"方式虽便宜但法律风险高。',
              riskLevel: 'high',
              emotionalValue: '合法身份是最大的安全感来源',
            },
          },
          {
            label: '国际保险（含远程医疗）',
            amount: 8000,
            frequency: 'yearly',
            note: 'SafetyWing / World Nomads',
            tip: {
              title: '为什么不能省保险',
              content:
                '普通旅游险不覆盖远程工作期间的意外。SafetyWing 专为数字游民设计，含 COVID 覆盖和笔记本电脑盗窃险。一次阑尾炎手术在东南亚私立医院约 ¥15,000-30,000。',
              riskLevel: 'high',
              emotionalValue: '生病时才知道有保险多安心',
            },
          },
          {
            label: '跨境税务咨询',
            amount: 3000,
            frequency: 'yearly',
            note: '避免双重征税',
            tip: {
              title: '税务居民身份',
              content:
                '每年在某国停留超过183天即成为税务居民。中国个税全球征税，但通过境外停留天数可申请境外所得免税。建议首年就找 CPA 规划，避免补税+罚款。',
              riskLevel: 'medium',
              emotionalValue: '省下的税就是多出来的旅行基金',
            },
          },
        ],
      },
      {
        title: '基础生活开销',
        icon: '🏠',
        items: [
          {
            label: '短租公寓/青旅',
            amount: 4000,
            frequency: 'monthly',
            note: 'Airbnb月度折扣价',
            tip: {
              title: '住宿策略',
              content:
                'Airbnb月租通常有40-60%折扣。直接联系房东可再砍10-15%。清迈月租 ¥1,500-3,000，巴厘岛 ¥2,500-5,000，里斯本 ¥5,000-9,000。建议第一个月住青旅，第二个月再签长租。',
              riskLevel: 'low',
              emotionalValue: '省钱不是抠门，是优化资源配置',
            },
          },
          {
            label: '咖啡馆办公消费',
            amount: 1500,
            frequency: 'monthly',
            note: '日均 ¥50 × 30天',
            tip: {
              title: 'Coworking vs 咖啡馆',
              content:
                '咖啡馆办公隐性成本：一杯咖啡占座4小时可能遭白眼，Wi-Fi不稳打断心流。共享办公空间月卡 ¥500-1,500，包含高速网、免费饮品和社交机会。清迈的 Punspace 月卡仅 ¥800。',
              riskLevel: 'medium',
              emotionalValue: '好的工作环境 = 好的产出 = 好的收入',
            },
          },
          {
            label: '当地饮食',
            amount: 2500,
            frequency: 'monthly',
            note: '50%自炊+50%外食',
            tip: {
              title: '饮食预算弹性',
              content:
                '东南亚街头餐 ¥10-25/顿，自己做饭 ¥500/月。欧洲超市自炊 ¥2,000-3,000/月。建议到当地后先逛菜市场，这是了解物价和融入本地最快的方式。',
              riskLevel: 'low',
              emotionalValue: '本地市场的烟火气是独属于游牧者的浪漫',
            },
          },
          {
            label: '通讯与流量',
            amount: 200,
            frequency: 'monthly',
            note: '当地SIM + eSIM',
            tip: {
              title: '网络是命脉',
              content:
                'Airalo eSIM 覆盖190+国家，比漫游便宜90%。但建议到当地后买一张实体 SIM 作为备份（月均 ¥50-100）。随身带一个移动路由（如 GlocalMe）做第三重备份。',
              riskLevel: 'medium',
              emotionalValue: '没有网的数字游民就像没有水的鱼',
            },
          },
        ],
      },
      {
        title: '生产力工具',
        icon: '💻',
        items: [
          {
            label: '笔记本电脑（MacBook Pro）',
            amount: 18000,
            frequency: 'once',
            depreciationRate: 0.25,
            lifespan: 4,
            tip: {
              title: '设备折旧哲学',
              content:
                '按照4年直线折旧，年均折损 ¥4,500。但作为生产力工具，一台好电脑每年创造的价值远超折旧额。建议买 AppleCare+（¥2,298/3年），在海外也能全球联保。',
              riskLevel: 'low',
              emotionalValue: '对自己生产力的投资永远值得',
            },
          },
          {
            label: '外接显示器（便携）',
            amount: 1800,
            frequency: 'once',
            depreciationRate: 0.33,
            lifespan: 3,
            tip: {
              title: '便携屏选购',
              content:
                '15.6寸便携屏重约 700g，Type-C 一线通。相比双屏提升效率约 30-40%。预算有限可到当地买二手（清迈二手屏 ¥300-500）。',
              riskLevel: 'low',
              emotionalValue: '第二块屏幕打开的不只是窗口，是效率维度',
            },
          },
          {
            label: '降噪耳机',
            amount: 2000,
            frequency: 'once',
            depreciationRate: 0.33,
            lifespan: 3,
            note: 'Sony/Bose',
            tip: {
              title: '降噪 = 专注力保护器',
              content:
                '开放式办公/咖啡馆的噪音平均 65-75 分贝，会显著降低认知表现。主动降噪耳机能减少约 25dB。这项投资本质上是「专注力保护费」。',
              riskLevel: 'low',
              emotionalValue: '安静是稀缺资源，而你买得起',
            },
          },
          {
            label: '软件订阅（年度）',
            amount: 3000,
            frequency: 'yearly',
            note: 'Notion/Figma/GitHub/Google Workspace',
            tip: {
              title: 'SaaS 订阅审计',
              content:
                '数字游民平均订阅 8-12 个 SaaS 服务，年费 ¥3,000-8,000。建议每季度做一次"订阅清理"，取消不用的。很多工具提供 freelancer 折扣（Notion 免费版功能已经够用）。',
              riskLevel: 'low',
              emotionalValue: '工具服务于你，不是你服务于工具',
            },
          },
        ],
      },
      {
        title: '社交与心理健康',
        icon: '🧠',
        items: [
          {
            label: 'Coworking 空间年卡',
            amount: 8000,
            frequency: 'yearly',
            note: '覆盖多个城市',
            tip: {
              title: '孤独感的隐性代价',
              content:
                '2023年 Buffer 调查显示，23%的数字游民认为孤独感是最大挑战。Coworking 不只是办公场所，更是社交基础设施。每周参加一次社区活动，比多赚 ¥2,000/月对你的幸福感贡献更大。',
              riskLevel: 'high',
              emotionalValue: '自由不代表孤独。社群是游牧者的锚点',
            },
          },
          {
            label: '语言学习',
            amount: 500,
            frequency: 'monthly',
            note: 'iTalki 每周2节',
            tip: {
              title: '语言 = 融入加速器',
              content:
                '学会当地语言的前100个词，就能把生活便利度提升50%。建议到新国家前先用 Duolingo 学一个月基础词，落地后找当地语伴（Hellotalk/Tandem 免费）。',
              riskLevel: 'low',
              emotionalValue: '用当地语言点一杯咖啡，是对这个城市说的第一句"你好"',
            },
          },
          {
            label: '定期回国/探亲机票',
            amount: 6000,
            frequency: 'yearly',
            note: '东南亚↔中国',
            tip: {
              title: '情感距离的真实成本',
              content:
                '时差+地理距离会放大亲情焦虑。建议每季度视频"家庭会议"，每半年回国一次。亚航东南亚回国单程 ¥500-1,500，比起一年不回家的心理代价，机票很便宜。',
              riskLevel: 'medium',
              emotionalValue: '再美的异国日落，也抵不过妈妈的一句"吃饭了吗"',
            },
          },
        ],
      },
    ],
    timeInvestment: [
      { label: '客户项目交付', hoursPerWeek: [25, 40], icon: '💼' },
      { label: '自我推广/接单', hoursPerWeek: [3, 8], icon: '📣' },
      { label: '技能提升', hoursPerWeek: [5, 10], icon: '📚' },
      { label: '行政/签证处理', hoursPerWeek: [2, 4], icon: '📋' },
      { label: '社交/探索', hoursPerWeek: [5, 15], icon: '🧭' },
    ],
    totalWeeklyHours: { min: 40, max: 77 },
    satisfactionRatings: {
      joy: 9,
      growth: 9,
      social: 5,
      freedom: 10,
      meaning: 8,
      convenience: 3,
    },
    benefits: [
      {
        title: '地理套利',
        description: '赚一线城市的钱，花三线城市的物价。清迈月生活费可低至¥6,000',
        icon: '💱',
        impact: 'high',
      },
      {
        title: '全球化视野',
        description: '每换一个国家就像换一个操作系统，思维成长的加速度远超同龄人',
        icon: '🌐',
        impact: 'high',
      },
      {
        title: '时间自主权',
        description: '早上冲浪、下午工作、晚上逛夜市，你重新定义"工作日"',
        icon: '🗽',
        impact: 'high',
      },
    ],
    knowledgeCards: [
      {
        title: '签证深度解析',
        content:
          '截至2026年，50+国家提供数字游民签证。克罗地亚（月收入€2,500+）、葡萄牙（€3,000+）、哥斯达黎加（$3,000+）最热门。泰国DTV签证（Destination Thailand Visa）每次可停留180天，5年有效。',
        icon: '🛂',
        tip: '推荐先试3个月免签国家（泰国/马来西亚），再考虑长期签证',
      },
      {
        title: '收入多元化法则',
        content:
          '只依赖一个客户是数字游民最危险的局面。建议3条收入线：主动收入（接单/时薪）、半被动（课程/模板）、被动（affiliate/投资）。',
        icon: '💎',
        tip: '从第一天开始，至少培养一个"睡后收入"来源',
      },
      {
        title: '健康管理预案',
        content:
          '不同国家医疗体系差异巨大。提前了解目的地"国际医院"位置（如曼谷的Bumrungrad、巴厘岛的BIMC）。随身带基础药包：抗生素、止泻药、抗过敏药。',
        icon: '🏥',
        tip: '出发前做一次全面体检，建立"健康基线"',
      },
    ],
    checklist: [
      '确认现有客户接受跨时区协作',
      '准备好3-6个月的生活储备金',
      '注册境外友好支付方式（Wise/Payoneer）',
      '下载离线地图+翻译App（Maps.me / Google Translate）',
      '设置时区工具（World Time Buddy）',
      '做好社保/公积金停缴方案（或灵活就业续缴）',
      '购买含远程工作保障的国际保险',
    ],
    risks: [
      {
        risk: '收入断流',
        probability: 'high',
        mitigation:
          '保持至少3个活跃客户+3个月紧急储备金+信用卡备用额度',
      },
      {
        risk: '孤独感/文化冲击',
        probability: 'high',
        mitigation:
          '每周参加至少1次线下社交活动，加入数字游民社区（Nomad List/当地WhatsApp群）',
      },
      {
        risk: '签证/法律风险',
        probability: 'medium',
        mitigation:
          '不逾期停留，提前2个月办续签。在灰色地带国家（如泰国免签），永远有Plan B目的地',
      },
      {
        risk: '设备故障/被抢',
        probability: 'medium',
        mitigation:
          '全盘加密+云端实时备份（Backblaze/iCloud）+设备保险，随身带便携硬盘做本地备份',
      },
    ],
    funFact:
      '全球数字游民数量已超3500万（2025 MBO Partners数据），其中美国占1700万。预计2030年将达到6000万——远程工作不是趋势，是现实。',
  },

  /* ════════════════════════════════════════════
   *  2. 发烧级咖啡玩家
   * ════════════════════════════════════════════ */
  {
    id: 'hobby-coffee-geek',
    category: 'hobby',
    slug: 'coffee-geek',
    title: '咖啡玩家',
    emoji: '☕',
    description:
      '从速溶到SOE单品豆，从星巴克到家用意式机。解构一杯好咖啡的真实成本',
    tagline: '每一杯都是对平庸外卖的优雅反抗',
    color: '#a16207',
    difficulty: '中等',
    lifespan: '设备3-10年',
    bufferFactor: 1.15,
    comparisonBaseline: {
      label: '精品咖啡馆拿铁均价',
      unitPrice: 32,
      unit: '元/杯',
      description: '对比星巴克/瑞幸/独立咖啡馆拿铁均价，计算自制回本周期',
    },
    adoption: [
      {
        id: 'entry',
        label: '入门手冲',
        priceRange: [500, 1500],
        description: '手冲壶+磨豆机+滤杯，日式极简美学',
      },
      {
        id: 'enthusiast',
        label: '发烧意式',
        priceRange: [8000, 25000],
        description: '半自动意式机+专业磨豆机，家庭咖啡馆',
      },
    ],
    sections: [
      {
        title: '核心设备',
        icon: '⚙️',
        items: [
          {
            label: '意式咖啡机',
            amount: 6000,
            frequency: 'once',
            depreciationRate: 0.12,
            lifespan: 8,
            note: 'Breville/惠家/铂富等中端机型',
            tip: {
              title: '意式机选购心法',
              content:
                '入门不要买¥1,000以下的"玩具机"——压力不稳、水温不准，出品还不如法压壶。¥5,000-8,000是最佳甜点区（如Breville Barista系列）。关键是温度稳定性+PID控温，而非外观。',
              riskLevel: 'medium',
              emotionalValue: '第一杯成功拉出郁金香的成就感，值回票价',
            },
          },
          {
            label: '专业磨豆机',
            amount: 3000,
            frequency: 'once',
            depreciationRate: 0.1,
            lifespan: 10,
            note: 'Mazzer/Eureka/DF64',
            tip: {
              title: '磨豆机比咖啡机重要',
              content:
                '咖啡圈名言："磨豆机的预算是咖啡机的50%以上"。磨豆不均匀=萃取不均=苦涩+酸涩同时出现。DF64（¥2,500）是最佳入门级平刀磨，可换SSP刀盘升级。',
              riskLevel: 'medium',
              emotionalValue: '好的磨豆机研磨声，是咖啡爱好者的ASMR',
            },
          },
          {
            label: '手冲套装',
            amount: 800,
            frequency: 'once',
            depreciationRate: 0.15,
            lifespan: 7,
            note: 'V60+手冲壶+电子秤',
            tip: {
              title: '手冲入门黄金组合',
              content:
                'Hario V60（¥60）+ Fellow Stagg温控壶（¥600）+ Timemore Black Mirror电子秤（¥200）= ¥860 即可入门手冲。电子秤是灵魂——没有计时称重，所有手冲参数都是玄学。',
              riskLevel: 'low',
              emotionalValue: '手冲的仪式感，是三分钟与自己独处的冥想',
            },
          },
        ],
      },
      {
        title: '耗材月供',
        icon: '🫘',
        items: [
          {
            label: '精品咖啡豆（月均）',
            amount: 300,
            frequency: 'monthly',
            note: '约4包250g单品豆',
            tip: {
              title: '豆子选购经济学',
              content:
                '¥75/250g 是入门精品的分水岭。低于¥50的多为商业拼配（焦苦为主）。建议一次买2-3包不同产区（埃塞花香/哥伦比亚坚果/印尼草本），每周轮换。养豆期：烘焙后5-14天最佳。',
              riskLevel: 'low',
              emotionalValue: '每一包新豆子都是一次未知的味觉冒险',
            },
          },
          {
            label: '牛奶（拉花用）',
            amount: 120,
            frequency: 'monthly',
            note: '每日1杯拿铁×250ml',
            tip: {
              title: '拉花牛奶怎么选',
              content:
                '全脂牛奶（脂肪3.5%以上）最容易打出绵密奶泡。巴氏奶优于UHT常温奶。打奶泡温度控制在55-65°C，超过70°C蛋白质变性，奶泡会塌。',
              riskLevel: 'low',
              emotionalValue: '第一次成功拉出爱心，你会拉着所有朋友来喝',
            },
          },
          {
            label: '滤纸/清洁粉',
            amount: 40,
            frequency: 'monthly',
            note: 'V60滤纸+Cafiza清洁粉',
            tip: {
              title: '清洁的科学',
              content:
                '咖啡油脂堆积会导致出品变苦。建议：每日反冲洗一次（清水），每周用Cafiza清洁粉反冲洗一次。滤纸选原木色（非漂白），用前用热水浸湿去除纸味。',
              riskLevel: 'low',
              emotionalValue: '清洁是咖啡仪式的一部分，而非负担',
            },
          },
        ],
      },
      {
        title: '进阶配件',
        icon: '🔧',
        items: [
          {
            label: '布粉器+压粉锤',
            amount: 400,
            frequency: 'once',
            depreciationRate: 0.33,
            lifespan: 3,
            tip: {
              title: '布粉决定萃取',
              content:
                '通道效应（channelling）是意式萃取的头号敌人——水只从一个点穿过粉饼，导致又苦又酸。布粉器（WDT针）+ 恒定压力压粉锤（推荐Spring-loaded）能大幅减少通道。',
              riskLevel: 'low',
              emotionalValue: '压粉时手腕发力的仪式感，是咖啡师的入门课',
            },
          },
          {
            label: '杯测勺+风味轮',
            amount: 100,
            frequency: 'once',
            depreciationRate: 0.5,
            lifespan: 2,
            tip: {
              title: '杯测：打开味觉的训练',
              content:
                'SCA咖啡风味轮定义了110种风味描述。杯测（cupping）是咖啡从业者和发烧友的"盲品"训练。建议买3款不同处理法的豆子（水洗/日晒/蜜处理），周末和朋友一起杯测对比。',
              riskLevel: 'low',
              emotionalValue: '当你喝出"蓝莓"和"柑橘"时，咖啡不再是苦水，而是风味地图',
            },
          },
          {
            label: '接粉杯+渣桶',
            amount: 150,
            frequency: 'once',
            depreciationRate: 0.5,
            lifespan: 2,
            tip: {
              title: '吧台不是必须的',
              content:
                '一个带 knock box 的接粉杯套装 ¥150，加上一张防滑咖啡垫 ¥30，厨房一角就能变身 mini 咖啡角。不需要专门的咖啡吧台，仪式感来自流程，而非空间大小。',
              riskLevel: 'low',
              emotionalValue: '在2㎡的角落经营一家只为自己营业的咖啡馆',
            },
          },
        ],
      },
    ],
    timeInvestment: [
      { label: '每日制作+清洁', hoursPerWeek: [2, 3.5], icon: '☕', description: '每日约20-30分钟' },
      { label: '调磨/校准', hoursPerWeek: [0.5, 1], icon: '🔧' },
      { label: '研究/杯测/社交', hoursPerWeek: [1, 3], icon: '📖' },
    ],
    totalWeeklyHours: { min: 3.5, max: 7.5 },
    satisfactionRatings: {
      joy: 9,
      growth: 7,
      social: 6,
      freedom: 8,
      meaning: 5,
      convenience: 3,
    },
    benefits: [
      {
        title: '单杯成本碾压外卖',
        description: '自制拿铁成本 ¥8-12/杯 vs 外卖 ¥30-40/杯。日省 ¥22，年省 ¥8,000+',
        icon: '💰',
        impact: 'high',
      },
      {
        title: '品质自由',
        description: '不再委屈于商业豆的焦苦。埃塞古吉、巴拿马瑰夏...你的咖啡你做主',
        icon: '🎯',
        impact: 'high',
      },
      {
        title: '社交货币',
        description: '"来我家喝杯咖啡"是最高级的社交开场白',
        icon: '🤝',
        impact: 'medium',
      },
    ],
    knowledgeCards: [
      {
        title: '烘焙度与风味',
        content:
          '浅烘=花香果酸（如埃塞俄比亚），中烘=坚果焦糖（如哥伦比亚），深烘=巧克力烟熏（如苏门答腊）。新手建议从中烘开始，口感更平衡。',
        icon: '🔥',
        tip: '烘焙日期比保质期重要得多——超过1个月的豆子风味已流失50%',
      },
      {
        title: '金杯萃取法则',
        content:
          'SCA金杯标准：粉水比1:15-1:18，萃取率18-22%，浓度1.15-1.35%。换算成数据：18g粉→270-324ml水，萃取时间2:30-3:00（手冲）/25-30秒（意式）。',
        icon: '🏆',
      },
      {
        title: '设备升级路径',
        content:
          '正确的升级顺序：豆子 > 磨豆机 > 咖啡机 > 配件。很多人花¥15,000买咖啡机却用¥60的豆子和¥300的磨豆机——这就是为什么"设备好但咖啡难喝"。',
        icon: '📈',
        tip: '新手的第一个升级应该是磨豆机，不是咖啡机',
      },
    ],
    checklist: [
      '先用手冲/法压壶入门，确定是真的喜欢而非三分钟热度',
      '投资一个好的磨豆机（至少¥1,500以上）',
      '找到本地靠谱的咖啡豆烘焙商（咖啡展/公众号/小红书）',
      '学习基础拉花（爱心→叶子→郁金香，约需练习100杯）',
      '每周一次清洁反冲洗，保持设备状态',
    ],
    risks: [
      {
        risk: '设备无底洞',
        probability: 'high',
        mitigation: '设定预算上限。记住：¥5,000设备和¥50,000设备在盲测中差异远小于你想象',
      },
      {
        risk: '咖啡因依赖',
        probability: 'medium',
        mitigation: '建议每日不超过3杯（约300mg咖啡因），下午2点后不喝浓缩，避免影响睡眠',
      },
      {
        risk: '豆子过期浪费',
        probability: 'medium',
        mitigation: '一次只买2-3包豆子（250g/包），开封后2周内用完。剩下的豆子密封冷冻可延长1个月',
      },
    ],
    funFact:
      '全球每天喝掉约22.5亿杯咖啡。芬兰人年均消费12kg咖啡豆（≈4杯/天），而中国仅0.15kg。但中国咖啡消费增速全球第一（年增15-20%）——咖啡文化正在这片茶之国土生根发芽。',
  },

  /* ════════════════════════════════════════════
   *  3. 新手露营
   * ════════════════════════════════════════════ */
  {
    id: 'hobby-camping',
    category: 'hobby',
    slug: 'camping',
    title: '新手露营',
    emoji: '🏕️',
    description:
      '从公园野餐到山野过夜，从一次性装备到精致露营（Glamping），用计算器找到你的甜蜜点',
    tagline: '在家和荒野之间，只需要一次尝试的距离',
    color: '#4ade80',
    difficulty: '低-中等',
    space: '需要收纳空间（至少1㎡储物区）',
    lifespan: '装备3-10年',
    bufferFactor: 1.25,
    comparisonBaseline: {
      label: '近郊民宿一晚均价',
      unitPrice: 500,
      unit: '元/晚',
      description: '对比住民宿 vs 露营的"回本"周期，以及体验差异',
    },
    adoption: [
      {
        id: 'rent-init',
        label: '先租后买',
        priceRange: [300, 800],
        description: '第一次先租装备体验，喜欢再买。单次租金约¥200-500',
      },
      {
        id: 'buy-entry',
        label: '一步到位入门',
        priceRange: [2000, 5000],
        description: '直接购买基础装备套装（帐篷+睡垫+炊具）',
      },
    ],
    sections: [
      {
        title: '睡眠系统',
        icon: '🛏️',
        items: [
          {
            label: '帐篷',
            amount: 800,
            frequency: 'once',
            depreciationRate: 0.15,
            lifespan: 7,
            note: '双人3季帐（Naturehike/牧高笛）',
            tip: {
              title: '帐篷选购第一定律',
              content:
                '买双人帐睡一个人！标称人数是"肉贴肉"的极限值。2人帐=1人舒适，3人帐=2人舒适。新手推荐金字塔帐（如Luxe Minipeak），搭建快（5分钟），抗风好。¥500-800是国产品牌的甜点区。',
              riskLevel: 'medium',
              emotionalValue: '第一次拉开帐篷看到满天星空，你会理解为什么人类需要荒野',
            },
          },
          {
            label: '睡垫（充气/蛋巢）',
            amount: 300,
            frequency: 'once',
            depreciationRate: 0.2,
            lifespan: 5,
            note: 'Therm-a-Rest / 挪客',
            tip: {
              title: '睡垫的R值',
              content:
                'R值=隔热能力。夏季R值1-2够用，春秋R值3-4，冬季需R值5+。新手最容易犯的错是忽略睡垫——帐篷+睡袋再好，睡垫没选对还是会冷。蛋巢垫（¥100-200）便宜耐造，充气垫（¥300-800）体积小但怕扎。',
              riskLevel: 'medium',
              emotionalValue: '一觉睡到自然醒的露营，才是真正的治愈',
            },
          },
          {
            label: '睡袋',
            amount: 400,
            frequency: 'once',
            depreciationRate: 0.2,
            lifespan: 5,
            note: '舒适温标5°C~0°C',
            tip: {
              title: '温标的陷阱',
              content:
                '睡袋标三个温度：舒适（女性体感）、极限（男性蜷缩可忍受）、极端（可能失温）。按舒适温标选！0°C舒适温标的睡袋在5°C环境下你才睡得舒服。羽绒睡袋（¥500+）轻便但怕潮，棉睡袋（¥200）便宜但重。',
              riskLevel: 'high',
              emotionalValue: '温暖是露营的第一人权——睡得好才能玩得好',
            },
          },
        ],
      },
      {
        title: '厨房系统',
        icon: '🍳',
        items: [
          {
            label: '炉头+气罐',
            amount: 200,
            frequency: 'once',
            depreciationRate: 0.25,
            lifespan: 4,
            note: '分体式炉头（火枫/岩谷）',
            tip: {
              title: '炉头选型',
              content:
                '分体式（炉头和气管分离）比一体式更稳更安全。扁气罐（¥15-25/罐）1罐足够2人做2-3顿饭。新手建议先买一套¥150-250的国产品牌套装（含炉头+锅）。先别买钛锅——铝合金锅便宜一大半，重量差异新手感觉不到。',
              riskLevel: 'medium',
              emotionalValue: '户外的第一顿饭，不管多简单都是米其林三星',
            },
          },
          {
            label: '锅具套装',
            amount: 250,
            frequency: 'once',
            depreciationRate: 0.2,
            lifespan: 5,
            note: '套锅2-3件（铝/硬质氧化）',
            tip: {
              title: '厨房最小化',
              content:
                '新手3件套就够了：一个锅煮面烧水、一个煎锅煎蛋煎肉、一个杯子喝咖啡。别买12件套——露营不是搬家，多余厨具=多余的重量=多余的清洗。',
              riskLevel: 'low',
              emotionalValue: 'Less is more，尤其是在大自然里',
            },
          },
          {
            label: '食材（每次出行）',
            amount: 150,
            frequency: 'weekly',
            note: '2人×2天预算',
            tip: {
              title: '露营菜单设计',
              content:
                '懒人菜单：早餐=挂耳咖啡+三明治（¥20），午餐=泡面+卤蛋（¥15），晚餐=火锅底料+超市预切菜（¥60）。加上零食饮料（¥50），2人2天约¥150。进阶可带牛排+铸铁锅，户外煎牛排的满足感远超米其林。',
              riskLevel: 'low',
              emotionalValue: '在海拔1500米煮的泡面，比CBD的拉面更香',
            },
          },
        ],
      },
      {
        title: '营地与交通',
        icon: '📍',
        items: [
          {
            label: '营地费',
            amount: 100,
            frequency: 'weekly',
            note: '普通营地¥50-150/晚',
            tip: {
              title: '营地选择策略',
              content:
                '有厕所+水源的收费营地（¥50-150）适合新手。野营地（免费但有风险）建议有5次以上经验再尝试。部分民宿/农场也提供"营地租赁"（自带装备¥50-100）。提前看天气预报——雨天露营，新手噩梦。',
              riskLevel: 'medium',
              emotionalValue: '选对营地=成功了一半。好的营地是旅程的目的地，而不只是睡觉的地方',
            },
          },
          {
            label: '油费/路费（每次）',
            amount: 200,
            frequency: 'weekly',
            note: '往返200km左右',
            tip: {
              title: '交通隐性成本',
              content:
                '去程兴奋油耗比回程高（因为开得快），回程疲惫风险更高。建议：去程慢开享受风景，回程服务区休息15分钟。拼车是分摊成本+扩大社交圈的好方式。',
              riskLevel: 'low',
              emotionalValue: '路上的风景，是露营体验的第一个章节',
            },
          },
        ],
      },
      {
        title: '洗晒与收纳时间成本',
        icon: '🧺',
        items: [
          {
            label: '帐篷晾晒/除霉',
            amount: 0,
            frequency: 'weekly',
            note: '每次露营后约2-3小时',
            tip: {
              title: '帐篷护理第一原则',
              content:
                '回家后必须撑开晾干！湿收=发霉=报废（霉菌会腐蚀防水涂层，且无法修复）。阳台/客厅摊开晾至少24小时。如果住小公寓没空间，买一个帐篷烘干除湿袋（¥30）。',
              riskLevel: 'high',
              emotionalValue: '你对装备的每一次保养，都是为下一次出发做的准备',
            },
          },
          {
            label: '炊具清洁',
            amount: 0,
            frequency: 'weekly',
            note: '每次约30-60分钟',
            tip: {
              title: '营地清洁法则',
              content:
                '户外清洗铁律：不使用化学洗涤剂在自然水源中！带一个小刮板刮掉食物残渣，用厨房纸擦一遍，回家后再彻底清洗。生物可降解洗洁精（如Sea to Summit）也要远离水源使用。',
              riskLevel: 'medium',
              emotionalValue: 'Leave No Trace——把美好留给下一个人',
            },
          },
          {
            label: '装备收纳空间占用',
            amount: 0,
            frequency: 'once',
            note: '约需1㎡储物空间+1个收纳箱',
            tip: {
              title: '收纳的隐性成本',
              content:
                '露营装备体积：帐篷≈55L背包，睡袋≈20L，锅具≈10L，椅子桌子≈30L。总计约115L=一个搬家纸箱的体积。如果你住20㎡的公寓，这1㎡的空间成本≈¥200/月（按房租折算）。买装备前先规划收纳区。',
              riskLevel: 'medium',
              emotionalValue: '收纳的不是装备，是下一次出发的可能性',
            },
          },
        ],
      },
    ],
    timeInvestment: [
      { label: '准备/打包', hoursPerWeek: [0.5, 1], icon: '🎒', description: '出行前物品清单+装车' },
      { label: '营地搭建/拆除', hoursPerWeek: [1, 2], icon: '⛺', description: '每次约1-2小时' },
      { label: '洗晒收纳', hoursPerWeek: [0.5, 1], icon: '🧺', description: '最容易被忽略的时间窟窿' },
      { label: '路线规划', hoursPerWeek: [0.5, 1], icon: '🗺️' },
    ],
    totalWeeklyHours: { min: 0, max: 5 },
    satisfactionRatings: {
      joy: 10,
      growth: 4,
      social: 8,
      freedom: 9,
      meaning: 5,
      convenience: 2,
    },
    benefits: [
      {
        title: '逃离屏幕',
        description: '露营区经常没信号。放下手机24小时，是对注意力最有效的重置',
        icon: '📵',
        impact: 'high',
      },
      {
        title: '成本远低于住酒店',
        description: '一晚营地费+食材 ¥250 vs 酒店 ¥500+。露营10次即可回本装备投资',
        icon: '💸',
        impact: 'high',
      },
      {
        title: '大自然疗愈',
        description: '森林浴（Shinrin-yoku）被研究证明能降低皮质醇、提升NK细胞活性',
        icon: '🌲',
        impact: 'high',
      },
    ],
    knowledgeCards: [
      {
        title: '三层着装法则',
        content:
          '内层排汗（速干、忌纯棉！）、中层保暖（抓绒/羽绒）、外层防风防水。纯棉"死亡面料"——湿了以后失温速度是干衣的25倍。',
        icon: '🧥',
        tip: '户外铁律：Cotton Kills（棉花会杀人）',
      },
      {
        title: '第一次露营清单',
        content:
          '必带：帐篷+睡垫+睡袋+头灯+急救包+打火机+纸巾湿巾+垃圾袋。可带可不带：露营椅（第一次可能全程站着兴奋）、蓝牙音箱（自然的声音是最好的BGM）。',
        icon: '📋',
      },
      {
        title: 'LNT七大原则',
        content:
          'Leave No Trace：提前计划准备、在可耐受地面行走露营、妥善处理垃圾、保持自然原貌、减少营火影响、尊重野生动物、考虑其他游客。这是一切户外活动的道德底线。',
        icon: '♻️',
        tip: '带走120%的垃圾——多出的20%是你对自然的小小回馈',
      },
    ],
    checklist: [
      '第一次露营选择收费营地（有厕所/水源）',
      '出发前3天检查天气预报（大风/暴雨取消）',
      '学习基础绳结（营绳结+双套结，只要2个就够了）',
      '在家先搭一次帐篷（避免在营地摸黑研究说明书）',
      '告诉至少1个不去的朋友你的行程+预计返回时间',
      '不带蓝牙音箱——自然的声音是最好的BGM',
    ],
    risks: [
      {
        risk: '天气突变',
        probability: 'medium',
        mitigation: '出发前72小时、24小时、12小时各查一次天气。关注"瞬时风速"而非"平均风速"',
      },
      {
        risk: '装备漏水/损坏',
        probability: 'medium',
        mitigation: '新帐篷先在家做"淋浴测试"（用花洒模拟下雨）。随身带帐篷修补胶和防雨布',
      },
      {
        risk: '蚊虫/蛇/野生动物',
        probability: 'low',
        mitigation: '帐篷拉链及时关闭，食物密封存放远离帐篷（至少50m），了解目的地常见蛇类',
      },
      {
        risk: '三分钟热度（装备吃灰）',
        probability: 'high',
        mitigation: '第一次先租装备体验！确认喜欢再买。很多人全套装备¥5,000购入，出去一次就闲置',
      },
    ],
    funFact:
      '日本"森林浴"（Shinrin-yoku）已被纳入国家健康计划。研究显示，在森林中待2小时，NK细胞（抗癌免疫细胞）活性提升50%，且效果可持续7天。露营，可能是最便宜的抗癌投资。',
  },
]
