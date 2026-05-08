# 创作系统工作规范 v1.0

## 一、目标

本规范用于约束小说/网文分析与续写系统的整体流程与行为，确保：

- 生成内容稳定、不发散
- 人物与设定不崩坏
- 创作流程可控、可复用
- 系统可工程化落地

---

## 二、总体原则

> 分析负责理解，规划负责选择，生成负责执行，校验负责纠偏。

任何模块不得越权。

---

## 三、模块分工

### 1. 文本解析模块
- 输入文本清洗（去格式、去噪）
- 分章节/段落切分
- 不参与分析与生成

### 2. 维度分析模块
- 按既定维度进行结构化分析
- 输出 JSON 数据
- 不参与创作

### 3. 创意规划模块
- 基于分析结果生成续写方向
- 输出候选方案（最多3个）

### 4. 决策确认模块
- 用户选择续写方向
- 确认大纲

### 5. 正文生成模块
- 严格按大纲生成内容
- 不得自行扩展主线

### 6. 一致性校验模块
- 检查人物、设定、情节、文风
- 输出问题与修复建议

### 7. 版本管理模块
- 保存分析结果
- 保存生成内容
- 支持回滚

---

## 四、创作流程

必须严格按照以下流程执行：

1. 原文输入
2. 多维分析
3. 生成续写方向（≤3个）
4. 用户确认方向
5. 生成卷级大纲
6. 用户确认大纲
7. 生成章节细纲
8. 正文生成（分段）
9. 一致性校验
10. 修改/继续生成

禁止跳过步骤。

---

## 五、核心分析维度

### 核心6维

1. 主题立意
2. 人物系统
3. 世界观规则
4. 情节结构
5. 情绪与读者预期
6. 文风与描写

### 扩展层

7. 类型套路与创新策略（策略层）

新增维度必须满足：

> 能直接提升生成质量

---

## 六、生成控制规则

### 1. 发散限制
- 每次最多3个创意方向
- 每个方向必须包含：
  - 核心冲突
  - 主角目标
  - 情绪走向
  - 与原文关系
  - 风险点

---

### 2. 情节确认机制

必须逐级确认：

- 方向 → 大纲 → 章节 → 场景 → 正文

禁止跨级生成。

---

### 3. 人设约束

禁止：
- 动机改变
- 性格突变
- 能力跳跃

如需修改，必须审批。

---

### 4. 世界观约束

禁止：
- 新规则无来源出现
- 力量体系不一致
- 时间线混乱

---

### 5. 创新控制

分三级：

- 低创新：完全贴合原文
- 中创新：调整情节
- 高创新：重构结构

默认：中低创新

---

### 6. 文风控制

模仿维度：
- 句式节奏
- 对话风格
- 描写密度
- 情绪表达

不进行逐字模仿。

---

### 7. 长度限制

每次生成：

- 800–1500字

生成后必须校验。

---

## 七、校验规则

每次生成必须检查：

- 人物是否OOC
- 世界观是否冲突
- 情节是否偏离大纲
- 情绪是否断裂
- 文风是否一致
- 是否引入未解释设定
- 是否存在逻辑跳跃

不通过则返工。

---

## 八、技术与成本控制

- 长文本必须分块
- 分析结果缓存
- 避免重复计算
- 使用向量检索
- 高成本模型仅用于关键步骤

---

## 九、版权与使用规范

系统定位：

- 辅助创作工具
- 原创内容生成

禁止：

- 复刻整本作品
- 模仿具体作者进行商业输出

---

## 十、核心执行铁律

> 无确认不生成
> 无大纲不写正文
> 无校验不进入下一步

---

## 版本信息

版本：v1.0  
状态：初版规范  
用途：系统开发与AI生成约束基础


---

# 附录 A：6维分析 JSON Schema v1.0

## 一、用途

本 Schema 用于将小说/网文原文拆解为结构化数据，作为后续续写、改写、规划和一致性校验的基础输入。

核心目标：

- 让 AI 分析结果可被程序读取
- 降低生成阶段发散风险
- 保证人物、世界观、情节、情绪、文风稳定
- 支持后续模块化调用

---

## 二、顶层结构

```json
{
  "metadata": {},
  "theme": {},
  "characters": [],
  "world_rules": {},
  "plot_engine": {},
  "emotion_engine": {},
  "style_system": {},
  "genre_strategy": {},
  "continuation_constraints": {},
  "risk_report": {}
}
```

---

## 三、完整 JSON Schema

```json
{
  "metadata": {
    "title": "",
    "source_type": "novel|webnovel|chapter|excerpt",
    "genre_tags": [],
    "analyzed_range": {
      "start_chapter": "",
      "end_chapter": "",
      "word_count": 0
    },
    "analysis_confidence": "low|medium|high"
  },

  "theme": {
    "core_theme": "",
    "surface_theme": "",
    "deep_theme": "",
    "value_orientation": "",
    "emotional_core": "",
    "recurring_motifs": [],
    "theme_risks": []
  },

  "characters": [
    {
      "character_id": "",
      "name": "",
      "role": "protagonist|antagonist|supporting|mentor|love_interest|other",
      "position_in_story": "",
      "personality_tags": [],
      "core_motivation": "",
      "external_goal": "",
      "internal_need": "",
      "fear_or_weakness": "",
      "bottom_line": "",
      "relationship_map": [
        {
          "target_character": "",
          "relationship_type": "ally|enemy|family|romantic|rival|mentor|unknown",
          "current_status": "",
          "tension_points": []
        }
      ],
      "arc_stage": "setup|growth|fall|transformation|resolution|unknown",
      "voice_traits": {
        "dialogue_style": "",
        "common_phrases": [],
        "speech_rhythm": "",
        "emotional_expression": ""
      },
      "ooc_constraints": []
    }
  ],

  "world_rules": {
    "setting_summary": "",
    "time_period": "",
    "location_system": [],
    "power_system": {
      "exists": true,
      "rules": [],
      "levels_or_ranks": [],
      "costs_or_limits": [],
      "forbidden_actions": []
    },
    "factions": [
      {
        "name": "",
        "type": "sect|family|company|kingdom|organization|race|other",
        "goal": "",
        "relationship_to_protagonist": "",
        "resources": [],
        "conflicts": []
      }
    ],
    "social_rules": [],
    "economic_rules": [],
    "unresolved_worldbuilding_questions": [],
    "world_consistency_constraints": []
  },

  "plot_engine": {
    "main_plot": "",
    "current_stage": "opening|development|turning_point|climax|aftermath|unknown",
    "active_conflicts": [
      {
        "conflict_id": "",
        "type": "person_vs_person|person_vs_self|person_vs_society|person_vs_world|person_vs_fate|other",
        "description": "",
        "stake": "",
        "current_status": "",
        "possible_next_steps": []
      }
    ],
    "subplots": [],
    "foreshadowing_items": [
      {
        "item": "",
        "introduced_at": "",
        "expected_payoff": "",
        "urgency": "low|medium|high"
      }
    ],
    "chapter_hook_patterns": [],
    "pacing_pattern": "fast|medium|slow|mixed",
    "plot_constraints": []
  },

  "emotion_engine": {
    "overall_tone": "",
    "reader_expectation": "",
    "emotional_curve": [
      {
        "segment": "",
        "dominant_emotion": "",
        "intensity": 1,
        "trigger_event": ""
      }
    ],
    "payoff_patterns": [],
    "tension_sources": [],
    "cooldown_methods": [],
    "reader_retention_hooks": [],
    "emotion_constraints": []
  },

  "style_system": {
    "narrative_pov": "first_person|third_person_limited|third_person_omniscient|mixed|unknown",
    "narrative_distance": "close|medium|far|mixed",
    "sentence_rhythm": "short|medium|long|mixed",
    "description_density": "low|medium|high",
    "dialogue_ratio": "low|medium|high",
    "sensory_focus": [],
    "common_rhetorical_methods": [],
    "scene_description_style": "",
    "action_description_style": "",
    "psychological_description_style": "",
    "style_do": [],
    "style_dont": []
  },

  "genre_strategy": {
    "primary_genre": "",
    "secondary_genres": [],
    "trope_patterns": [],
    "reader_promises": [],
    "innovation_points": [],
    "allowed_innovation_level": "low|medium|high",
    "genre_constraints": []
  },

  "continuation_constraints": {
    "must_keep": [],
    "must_not_change": [],
    "can_expand": [],
    "need_user_confirmation": [],
    "recommended_next_direction": []
  },

  "risk_report": {
    "ooc_risks": [],
    "worldbuilding_risks": [],
    "plot_drift_risks": [],
    "style_mismatch_risks": [],
    "copyright_or_similarity_risks": [],
    "overall_risk_level": "low|medium|high"
  }
}
```

---

## 四、字段使用原则

### 1. metadata
用于记录分析对象的基本信息，不参与直接创作，但用于版本管理和缓存。

### 2. theme
用于控制作品精神内核，避免续写只推进情节而丢失原文气质。

### 3. characters
用于防止 OOC，是续写阶段的硬约束。

### 4. world_rules
用于防止设定崩坏，是奇幻、玄幻、科幻、系统流作品的关键约束。

### 5. plot_engine
用于规划下一步情节，控制主线、支线、伏笔和章节钩子。

### 6. emotion_engine
用于控制读者体验，包括爽点、虐点、燃点、期待兑现和情绪缓冲。

### 7. style_system
用于控制文风与表达，不追求逐字模仿，只保留表达规律。

### 8. genre_strategy
作为策略层使用，不一定每次生成都参与，但会影响整体方向。

### 9. continuation_constraints
这是从分析进入续写的桥梁，必须在正式生成前确认。

### 10. risk_report
用于标记潜在失控点，供一致性校验模块调用。

---

## 五、生成阶段调用规则

续写时不得一次性使用全部字段，而应采用：

> 主维度 + 约束维度 + 激发维度

### 常用组合

#### 1. 正常续写
- 主维度：plot_engine
- 约束维度：characters + world_rules
- 激发维度：emotion_engine

#### 2. 爽点强化
- 主维度：emotion_engine
- 约束维度：characters + plot_engine
- 激发维度：genre_strategy

#### 3. 文风复刻
- 主维度：style_system
- 约束维度：characters + world_rules
- 激发维度：theme

#### 4. 新支线设计
- 主维度：plot_engine
- 约束维度：world_rules + characters
- 激发维度：genre_strategy

#### 5. 人物高光章节
- 主维度：characters
- 约束维度：theme + plot_engine
- 激发维度：emotion_engine

---

## 六、硬性限制

1. characters.ooc_constraints 不得违反。
2. world_rules.world_consistency_constraints 不得违反。
3. continuation_constraints.must_not_change 不得修改。
4. 未经用户确认，不得使用 need_user_confirmation 中的内容进入正文。
5. risk_report.overall_risk_level 为 high 时，不得直接生成正文，必须先修复方案。

---

## 七、最小可用版本字段

如果 MVP 阶段需要简化，至少保留：

```json
{
  "theme": {},
  "characters": [],
  "world_rules": {},
  "plot_engine": {},
  "emotion_engine": {},
  "style_system": {},
  "continuation_constraints": {},
  "risk_report": {}
}
```

---

## 八、后续版本规划

v1.1 可加入：

- 章节级情绪曲线
- 人物关系图谱 ID 化
- 伏笔生命周期追踪
- 读者预期评分
- 相似桥段风险检测
- 多模型交叉校验


---

# 附录 B：分析模块开发规范 v1.0（10维分析 + AI集成）

## 一、模块目标

分析模块是整个小说/网文创作系统的基础层，负责将输入文本转化为结构化创作数据。

其目标不是简单总结文本，而是为后续的：

- 续写方向生成
- 情节规划
- 正文生成
- 人设校验
- 世界观校验
- 文风控制
- 风险识别

提供稳定、可复用、可检索的中间数据。

---

## 二、分析模块边界

### 允许做的事

分析模块只负责：

1. 解析文本内容
2. 提取结构化信息
3. 输出分析报告
4. 生成续写约束
5. 标记风险点
6. 提供后续模块可调用的数据

### 禁止做的事

分析模块不得：

1. 直接续写正文
2. 擅自生成大纲
3. 擅自修改人物设定
4. 擅自扩展世界观
5. 对剧情走向做最终决策
6. 替用户确认创意方向

---

## 三、10维分析体系

在原有 6 维基础上，分析模块升级为 10 维。10 维不是全部等权，而是分为：

- 核心约束维度
- 生成驱动维度
- 风险辅助维度

---

## 四、10个分析维度定义

### 1. 主题立意分析（Theme Analysis）

用于判断作品的精神内核。

重点提取：

- 核心主题
- 表层主题
- 深层主题
- 价值取向
- 情感内核
- 反复出现的意象
- 主题风险

输出作用：

- 控制续写精神方向
- 避免续写只剩剧情推进
- 支撑反转、升维、反讽等创意策略

---

### 2. 人物系统分析（Character System Analysis）

用于防止 OOC，是分析模块最高优先级之一。

重点提取：

- 主要人物列表
- 人设标签
- 核心动机
- 外在目标
- 内在需求
- 恐惧与弱点
- 底线
- 成长阶段
- 说话方式
- 人物关系网
- OOC 禁区

输出作用：

- 约束正文生成
- 支撑人物高光章节
- 支撑冲突设计
- 用于一致性校验

---

### 3. 世界观与规则分析（World Rules Analysis）

用于保证设定自洽。

重点提取：

- 故事背景
- 时间线
- 地点体系
- 力量体系
- 社会规则
- 经济规则
- 势力格局
- 禁止行为
- 规则代价
- 未解设定问题

输出作用：

- 限制剧情可能性
- 防止设定崩坏
- 支撑地图扩展、势力扩展、规则漏洞设计

---

### 4. 情节结构分析（Plot Structure Analysis）

用于判断故事如何推进。

重点提取：

- 当前主线
- 当前阶段
- 主冲突
- 支线
- 伏笔
- 冲突升级路径
- 章节钩子
- 断章方式
- 爽点/虐点位置

输出作用：

- 支撑后续大纲生成
- 控制节奏
- 防止剧情发散
- 管理伏笔回收

---

### 5. 情绪与读者预期分析（Emotion & Expectation Analysis）

用于判断读者为什么愿意继续看。

重点提取：

- 整体情绪基调
- 当前情绪曲线
- 期待铺垫
- 期待兑现
- 爽点、虐点、燃点、甜点
- 情绪峰值
- 情绪缓冲方式
- 读者心理锚点

输出作用：

- 控制续写留存感
- 判断是否需要爆点或缓冲
- 防止情绪断裂

---

### 6. 文风与描写分析（Style & Description Analysis）

用于保持文本表达稳定。

重点提取：

- 叙事视角
- 叙事距离
- 句式节奏
- 描写密度
- 对话比例
- 五感描写偏好
- 动作描写方式
- 心理描写方式
- 常用修辞
- 文风禁区

输出作用：

- 控制正文口吻
- 支撑风格迁移
- 避免机械仿写

---

### 7. 类型套路与市场标签分析（Genre & Trope Analysis）

用于识别作品所属网文类型和读者预期。

重点提取：

- 主类型
- 副类型
- 常见套路
- 反套路点
- 类型承诺
- 市场标签
- 同类作品常见节奏
- 可创新空间

输出作用：

- 确定读者 baseline
- 支撑创意策略选择
- 防止类型错位

---

### 8. 伏笔与信息控制分析（Foreshadowing & Information Control Analysis）

用于管理悬念、信息差和伏笔生命周期。

重点提取：

- 已埋伏笔
- 已揭示信息
- 未揭示信息
- 读者知道但角色不知道的信息
- 角色知道但读者不知道的信息
- 信息延迟披露点
- 伏笔回收优先级

输出作用：

- 支撑悬念设计
- 避免提前泄底
- 避免伏笔遗忘
- 支撑反转生成

---

### 9. 场景与镜头语言分析（Scene & Cinematic Analysis）

用于拆解场景组织和画面呈现方式。

重点提取：

- 主要场景类型
- 场景切换方式
- 入场方式
- 退场方式
- 镜头焦点
- 画面感来源
- 动作场面组织
- 对话场面组织
- 场景节奏

输出作用：

- 支撑正文分场景生成
- 提升画面感
- 避免纯说明文式续写

---

### 10. 风险与一致性分析（Risk & Consistency Analysis）

用于提前发现续写风险。

重点提取：

- OOC 风险
- 设定冲突风险
- 情节跑偏风险
- 文风不一致风险
- 情绪断裂风险
- 伏笔遗漏风险
- 相似度/版权风险
- 生成难点

输出作用：

- 决定是否允许进入规划模块
- 给校验模块提供检查清单
- 标记需要用户确认的内容

---

## 五、10维优先级

### 一级硬约束

正文生成阶段必须遵守：

1. 人物系统
2. 世界观与规则
3. 风险与一致性

### 二级生成驱动

用于推动情节和读者体验：

4. 情节结构
5. 情绪与读者预期
6. 伏笔与信息控制

### 三级表达控制

用于控制文本呈现：

7. 文风与描写
8. 场景与镜头语言

### 四级策略辅助

用于确定方向和创新边界：

9. 主题立意
10. 类型套路与市场标签

---

## 六、分析模块总体流程

```text
用户上传文本
  ↓
文本解析与清洗
  ↓
章节/段落切分
  ↓
基础摘要生成
  ↓
10维并行/分批分析
  ↓
分析结果合并
  ↓
冲突检测
  ↓
生成结构化 JSON
  ↓
生成分析报告
  ↓
输出续写约束与风险清单
```

---

## 七、AI 集成方式

### 1. 推荐采用多 Agent 分工

不要让一个 Prompt 一次完成全部 10 维分析。

建议拆为：

| Agent | 负责内容 |
|---|---|
| ThemeAgent | 主题立意 |
| CharacterAgent | 人物系统 |
| WorldAgent | 世界观规则 |
| PlotAgent | 情节结构 |
| EmotionAgent | 情绪与读者预期 |
| StyleAgent | 文风与描写 |
| GenreAgent | 类型套路 |
| ForeshadowAgent | 伏笔与信息控制 |
| SceneAgent | 场景与镜头语言 |
| RiskAgent | 风险与一致性 |
| MergeAgent | 结果合并与冲突消解 |

---

### 2. 推荐调用策略

#### 短文本/单章

可以使用：

```text
一次输入 → 分维度分析 → 合并输出
```

#### 长篇/多章

必须使用：

```text
分章分析 → 卷级合并 → 全书级合并
```

---

## 八、长文本处理规则

### 1. 切分原则

文本切分优先级：

1. 卷
2. 章节
3. 场景
4. 自然段

禁止按固定 token 粗暴切割导致剧情断裂。

---

### 2. 上下文保留

每次分析 chunk 时必须提供：

- 当前章节文本
- 前文摘要
- 已确认人物表
- 已确认世界观规则
- 已确认伏笔表

---

### 3. 分层记忆

长篇必须建立三层记忆：

#### 章节级记忆

记录单章内容、情绪、事件、人物状态。

#### 卷级记忆

记录阶段性主线、势力变化、人物成长。

#### 全局记忆

记录不可变设定、核心人物、世界规则、主线目标。

---

## 九、分析输出结构

分析模块最终输出两个结果：

1. 机器可读 JSON
2. 人类可读分析报告

---

### 1. 机器可读 JSON

用于后端存储、检索和后续 AI 调用。

```json
{
  "analysis_id": "",
  "project_id": "",
  "source_id": "",
  "analysis_version": "1.0",
  "scope": {
    "type": "chapter|volume|book|excerpt",
    "range": "",
    "word_count": 0
  },
  "dimensions": {
    "theme": {},
    "characters": {},
    "world_rules": {},
    "plot_structure": {},
    "emotion_expectation": {},
    "style_description": {},
    "genre_trope": {},
    "foreshadowing_info": {},
    "scene_cinematic": {},
    "risk_consistency": {}
  },
  "continuation_constraints": {
    "must_keep": [],
    "must_not_change": [],
    "can_expand": [],
    "need_user_confirmation": []
  },
  "quality": {
    "confidence": "low|medium|high",
    "missing_information": [],
    "conflicts_found": [],
    "requires_human_review": true
  }
}
```

---

### 2. 人类可读分析报告

报告结构：

```markdown
# 分析报告

## 1. 文本概况

## 2. 10维分析结论

## 3. 续写可用素材

## 4. 硬约束

## 5. 可扩展方向

## 6. 风险清单

## 7. 建议进入下一阶段的条件
```

---

## 十、AI Prompt 标准结构

每个维度 Agent 的 Prompt 必须包含：

1. 角色定义
2. 输入范围
3. 分析目标
4. 输出字段
5. 禁止事项
6. JSON 输出要求
7. 不确定性标注

---

### 通用 Prompt 模板

```text
你是小说/网文创作系统中的【{dimension_name}】分析 Agent。

你的任务是：
基于输入文本，只分析【{dimension_name}】相关内容。

你必须遵守：
1. 不续写正文。
2. 不擅自创造原文不存在的设定。
3. 不做最终剧情决策。
4. 无法确定的信息必须标记为 unknown。
5. 所有结论必须能从文本中找到依据，或标记为 inference。

输入内容：
【文本】
{content}

【前文摘要】
{previous_summary}

【已确认设定】
{confirmed_context}

请输出 JSON，不要输出多余解释。

输出字段：
{json_schema}
```

---

## 十一、10维 Agent Prompt 设计

### 1. ThemeAgent

目标：提取主题、立意、价值观、情感内核。

关键要求：

- 区分表层主题和深层主题
- 标记重复意象
- 不要把单个事件误判为主题

---

### 2. CharacterAgent

目标：提取人物系统和 OOC 禁区。

关键要求：

- 人物动机必须从行为和对白中推断
- 不确定的人物关系标记 unknown
- 明确人物不能被续写破坏的边界

---

### 3. WorldAgent

目标：提取世界观规则和边界条件。

关键要求：

- 规则必须区分 confirmed 和 inferred
- 记录规则代价、限制、例外
- 不得补全原文没有的设定

---

### 4. PlotAgent

目标：提取主线、支线、冲突、伏笔、节奏。

关键要求：

- 区分已发生事件和可能发展
- 标记当前剧情阶段
- 记录未解决冲突

---

### 5. EmotionAgent

目标：提取情绪曲线和读者预期。

关键要求：

- 标记情绪峰值
- 判断期待铺垫与兑现
- 区分人物情绪和读者情绪

---

### 6. StyleAgent

目标：提取文风和描写规律。

关键要求：

- 不输出原文大段仿写
- 提取风格规律而非复制句子
- 区分叙事、对白、动作、心理描写

---

### 7. GenreAgent

目标：识别类型套路、市场标签和创新空间。

关键要求：

- 类型判断要给置信度
- 标记读者期待
- 不强行套入不相关类型

---

### 8. ForeshadowAgent

目标：管理伏笔和信息披露。

关键要求：

- 区分伏笔、悬念、普通信息
- 标记回收优先级
- 标记信息掌握者：读者/角色/叙述者

---

### 9. SceneAgent

目标：分析场景组织和镜头语言。

关键要求：

- 记录场景进入和退出方式
- 标记画面焦点
- 标记动作场面、对话场面、心理场面比例

---

### 10. RiskAgent

目标：识别续写风险。

关键要求：

- 不提出正文续写
- 只标记风险和修复建议
- 高风险必须说明原因

---

## 十二、分析质量评分

每次分析后必须评分：

| 指标 | 说明 |
|---|---|
| 完整度 | 是否覆盖主要人物、设定、情节 |
| 准确度 | 是否忠于原文 |
| 可用性 | 是否能服务续写 |
| 风险识别 | 是否发现潜在崩坏点 |
| 结构化程度 | 是否符合 JSON Schema |

评分范围：1-5。

总分低于 3.5，不允许进入规划模块。

---

## 十三、冲突检测规则

MergeAgent 必须检查：

1. 人物动机是否前后冲突
2. 世界规则是否互相矛盾
3. 情绪判断是否与情节事件不匹配
4. 类型判断是否与实际文本不匹配
5. 风格判断是否与样本长度不匹配
6. 伏笔是否被误识别为已回收

发现冲突后输出：

```json
{
  "conflict_type": "",
  "related_dimensions": [],
  "description": "",
  "severity": "low|medium|high",
  "recommended_resolution": ""
}
```

---

## 十四、数据库建议

建议至少设计以下表：

### 1. projects

存储创作项目。

### 2. sources

存储上传文本、章节、文件信息。

### 3. analysis_results

存储完整分析 JSON。

### 4. character_profiles

存储人物档案。

### 5. world_rules

存储世界观规则。

### 6. plot_threads

存储主线、支线和冲突。

### 7. foreshadowing_items

存储伏笔生命周期。

### 8. style_profiles

存储文风画像。

### 9. risk_reports

存储风险报告。

### 10. analysis_versions

存储版本与回滚信息。

---

## 十五、API 设计建议

### 1. 创建分析任务

```http
POST /api/analysis/tasks
```

请求：

```json
{
  "project_id": "",
  "source_id": "",
  "scope": "chapter|volume|book|excerpt",
  "dimensions": [
    "theme",
    "characters",
    "world_rules",
    "plot_structure",
    "emotion_expectation",
    "style_description",
    "genre_trope",
    "foreshadowing_info",
    "scene_cinematic",
    "risk_consistency"
  ]
}
```

---

### 2. 查询分析任务状态

```http
GET /api/analysis/tasks/{task_id}
```

---

### 3. 获取分析结果

```http
GET /api/analysis/results/{analysis_id}
```

---

### 4. 重新分析指定维度

```http
POST /api/analysis/results/{analysis_id}/rerun
```

请求：

```json
{
  "dimensions": ["characters", "world_rules"],
  "reason": "用户修正了人物设定"
}
```

---

### 5. 确认分析结果

```http
POST /api/analysis/results/{analysis_id}/confirm
```

作用：

将分析结果标记为可进入规划模块。

---

## 十六、开发任务拆分

### 阶段 1：MVP 分析闭环

目标：完成单章/短文本 10维分析。

任务：

1. 文本上传与清洗
2. 单章切分
3. 10维 Prompt 编写
4. AI 调用封装
5. JSON Schema 校验
6. 分析报告展示
7. 手动确认按钮

验收标准：

- 输入一章文本后可输出完整 10维 JSON
- 可查看人类可读报告
- 可手动确认进入下一阶段

---

### 阶段 2：长篇分析能力

目标：支持多章、多卷分析。

任务：

1. 章节级分析
2. 卷级合并
3. 全局人物表
4. 全局世界观规则库
5. 伏笔生命周期管理
6. 分析结果缓存

验收标准：

- 支持 10章以上连续分析
- 人物状态可随章节更新
- 伏笔可追踪

---

### 阶段 3：分析结果可调用

目标：让规划模块和生成模块能调用分析结果。

任务：

1. API 查询分析结果
2. 按维度检索
3. 按人物检索
4. 按伏笔检索
5. 按世界观规则检索
6. 提供生成上下文包

验收标准：

- 可为续写生成提供上下文包
- 可按场景选择主维度、约束维度、激发维度

---

## 十七、MVP 推荐实现顺序

1. 文本上传
2. 文本清洗
3. 单章分析
4. 10维 Prompt
5. JSON 输出
6. Schema 校验
7. 人类可读报告
8. 用户确认
9. 分析结果保存
10. 提供给规划模块调用

---

## 十八、硬性开发限制

1. 分析模块不得生成正文。
2. 分析模块不得自动决定续写方向。
3. 所有 AI 输出必须经过 JSON 校验。
4. 所有不确定信息必须标记 unknown 或 inference。
5. 高风险分析结果不得进入规划模块。
6. 长文本不得一次性塞入模型。
7. 分析结果必须可版本化。
8. 用户修正内容优先级高于 AI 分析结果。
9. 人物与世界观数据必须支持增量更新。
10. Prompt 与 Schema 必须分版本管理。

---

## 十九、下一步交付物

分析模块后续需要继续补齐：

1. 10维完整 JSON Schema
2. 10个 Agent 的正式 Prompt 模板
3. MergeAgent 合并 Prompt
4. RiskAgent 校验规则
5. 数据库表结构 SQL
6. API 接口详细文档
7. 前端分析报告页面结构
8. 云端任务队列设计

