# Phase 2：分析模块开发计划

> **版本：** v2.0（整合助手 A+B 参考）  
> **状态：** 🔄 开发中  
> **预计完成：** 2026-05-15  
> **负责人：** 婉儿（三省六部统筹）

---

## 一、模块定位与硬性边界

### ✅ 允许做的事
1. 接收清洗后的文本块，按 10 维体系进行结构化解析
2. 输出标准化 JSON 数据与人类可读分析报告
3. 提取硬约束、风险点、伏笔清单与续写边界
4. 支持增量更新、版本快照与局部重跑
5. 为规划模块、生成模块提供结构化上下文包

### 🚫 严禁做的事
1. **禁止续写正文**、生成大纲、设计情节走向
2. **禁止替用户决策**续写方向或创新等级
3. **禁止跨阶段调用**生成/规划模块能力
4. **禁止输出自由文本**代替结构化数据
5. **禁止忽略置信度标注**（不确定信息必须标记 `unknown` 或 `inference`）

---

## 二、10 维分析体系与优先级

| 优先级 | 维度 | 核心作用 | 下游调用规则 |
|:---|:---|:---|:---|
| 🔴 **一级硬约束** | 1. 人物系统 | 防 OOC、锁定动机/底线/语言指纹 | 生成阶段强制校验，冲突即打回 |
|  | 2. 世界观规则 | 防设定崩塌、力量/社会/经济边界 | 新增规则必须附带来源与逻辑链 |
|  | 3. 风险与一致性 | 全局崩坏预警、相似度/版权检测 | 高风险拦截规划模块入口 |
| 🟠 **二级生成驱动** | 4. 情节结构 | 主线/支线/冲突/节奏/断章钩子 | 支撑卷级大纲与章节节拍生成 |
|  | 5. 情绪与读者预期 | 情绪曲线/期待兑现/心理锚点 | 控制张力峰值与缓冲策略 |
|  | 6. 伏笔与信息控制 | 悬念生命周期/信息差管理 | 决定反转时机与披露节奏 |
| 🟡 **三级表达控制** | 7. 文风与描写 | 句式/对话/修辞/感官偏好 | 风格迁移与文风指纹复刻 |
|  | 8. 场景与镜头语言 | 场景切换/焦点/画面感组织 | 支撑分场景生成与沉浸感构建 |
| 🟢 **四级策略辅助** | 9. 主题立意 | 核心命题/价值取向/情感定调 | 决定续写精神内核与情绪基调 |
|  | 10. 类型套路与市场标签 | 流派预期/套路/创新空间 | 划定类型边界与读者心理 Baseline |

> 💡 **交叉调用原则：** 续写规划时采用 `主维度 + 约束维度 + 激发维度` 组合，禁止全量注入导致上下文稀释。

---

## 三、JSON Schema v2.0（精简核心字段）

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AnalysisReportV2",
  "type": "object",
  "required": ["metadata", "dimensions", "constraints", "risk_report", "quality"],
  "properties": {
    "metadata": {
      "type": "object",
      "required": ["analysis_id", "project_id", "source_scope", "word_count"],
      "properties": {
        "analysis_id": { "type": "string", "description": "分析任务唯一 ID" },
        "project_id": { "type": "string", "description": "所属项目 ID" },
        "source_scope": { "type": "string", "enum": ["chapter", "volume", "book", "excerpt"] },
        "word_count": { "type": "integer" },
        "analysis_timestamp": { "type": "string", "format": "date-time" }
      }
    },
    "dimensions": {
      "type": "object",
      "required": ["characters", "world_rules", "risk_consistency"],
      "properties": {
        "theme": { "$ref": "#/definitions/theme" },
        "characters": { "type": "array", "items": { "$ref": "#/definitions/character" } },
        "world_rules": { "$ref": "#/definitions/world_rules" },
        "plot_structure": { "$ref": "#/definitions/plot_structure" },
        "emotion_expectation": { "$ref": "#/definitions/emotion_expectation" },
        "style_description": { "$ref": "#/definitions/style_description" },
        "genre_trope": { "$ref": "#/definitions/genre_trope" },
        "foreshadowing_info": { "$ref": "#/definitions/foreshadowing_info" },
        "scene_cinematic": { "$ref": "#/definitions/scene_cinematic" },
        "risk_consistency": { "$ref": "#/definitions/risk_consistency" }
      }
    },
    "constraints": {
      "type": "object",
      "required": ["must_keep", "must_not_change"],
      "properties": {
        "must_keep": { "type": "array", "items": { "type": "string" } },
        "must_not_change": { "type": "array", "items": { "type": "string" } },
        "can_expand": { "type": "array", "items": { "type": "string" } },
        "need_user_confirmation": { "type": "array", "items": { "type": "string" } }
      }
    },
    "risk_report": {
      "type": "object",
      "required": ["overall_risk_level"],
      "properties": {
        "ooc_risks": { "type": "array", "items": { "type": "string" } },
        "worldbuilding_risks": { "type": "array", "items": { "type": "string" } },
        "plot_drift_risks": { "type": "array", "items": { "type": "string" } },
        "style_mismatch_risks": { "type": "array", "items": { "type": "string" } },
        "overall_risk_level": { "type": "string", "enum": ["low", "medium", "high"] }
      }
    },
    "quality": {
      "type": "object",
      "required": ["confidence", "score"],
      "properties": {
        "confidence": { "type": "string", "enum": ["low", "medium", "high"] },
        "score": { "type": "number", "minimum": 1, "maximum": 5 },
        "missing_information": { "type": "array", "items": { "type": "string" } },
        "conflicts_found": { "type": "array", "items": { "type": "object" } },
        "requires_human_review": { "type": "boolean" }
      }
    }
  },
  "definitions": {
    "theme": {
      "type": "object",
      "properties": {
        "core_theme": { "type": "string" },
        "surface_theme": { "type": "string" },
        "deep_theme": { "type": "string" },
        "value_orientation": { "type": "string" },
        "emotional_core": { "type": "string" },
        "recurring_motifs": { "type": "array", "items": { "type": "string" } }
      }
    },
    "character": {
      "type": "object",
      "required": ["character_id", "name", "role", "core_motivation", "bottom_line", "ooc_constraints"],
      "properties": {
        "character_id": { "type": "string" },
        "name": { "type": "string" },
        "role": { "type": "string", "enum": ["protagonist", "antagonist", "supporting", "mentor", "love_interest", "other"] },
        "personality_tags": { "type": "array", "items": { "type": "string" } },
        "core_motivation": { "type": "string" },
        "external_goal": { "type": "string" },
        "internal_need": { "type": "string" },
        "fear_or_weakness": { "type": "string" },
        "bottom_line": { "type": "string" },
        "arc_stage": { "type": "string", "enum": ["setup", "growth", "fall", "transformation", "resolution", "unknown"] },
        "voice_traits": {
          "type": "object",
          "properties": {
            "dialogue_style": { "type": "string" },
            "speech_rhythm": { "type": "string" },
            "emotional_expression": { "type": "string" }
          }
        },
        "ooc_constraints": { "type": "array", "items": { "type": "string" } }
      }
    },
    "world_rules": {
      "type": "object",
      "properties": {
        "setting_summary": { "type": "string" },
        "time_period": { "type": "string" },
        "power_system": {
          "type": "object",
          "properties": {
            "exists": { "type": "boolean" },
            "rules": { "type": "array", "items": { "type": "string" } },
            "levels_or_ranks": { "type": "array", "items": { "type": "string" } },
            "costs_or_limits": { "type": "array", "items": { "type": "string" } },
            "forbidden_actions": { "type": "array", "items": { "type": "string" } }
          }
        },
        "world_consistency_constraints": { "type": "array", "items": { "type": "string" } }
      }
    },
    "plot_structure": {
      "type": "object",
      "properties": {
        "main_plot": { "type": "string" },
        "current_stage": { "type": "string", "enum": ["opening", "development", "turning_point", "climax", "aftermath", "unknown"] },
        "active_conflicts": { "type": "array", "items": { "type": "object" } },
        "foreshadowing_items": { "type": "array", "items": { "type": "object" } },
        "pacing_pattern": { "type": "string", "enum": ["fast", "medium", "slow", "mixed"] }
      }
    },
    "emotion_expectation": {
      "type": "object",
      "properties": {
        "overall_tone": { "type": "string" },
        "emotional_curve": { "type": "array", "items": { "type": "object" } },
        "reader_expectation": { "type": "string" }
      }
    },
    "style_description": {
      "type": "object",
      "properties": {
        "narrative_pov": { "type": "string", "enum": ["first_person", "third_person_limited", "third_person_omniscient", "mixed", "unknown"] },
        "sentence_rhythm": { "type": "string", "enum": ["short", "medium", "long", "mixed"] },
        "description_density": { "type": "string", "enum": ["low", "medium", "high"] },
        "dialogue_ratio": { "type": "string", "enum": ["low", "medium", "high"] }
      }
    },
    "genre_trope": {
      "type": "object",
      "properties": {
        "primary_genre": { "type": "string" },
        "trope_patterns": { "type": "array", "items": { "type": "string" } },
        "allowed_innovation_level": { "type": "string", "enum": ["low", "medium", "high"] }
      }
    },
    "foreshadowing_info": {
      "type": "object",
      "properties": {
        "items": { "type": "array", "items": { "type": "object" } },
        "unresolved_count": { "type": "integer" }
      }
    },
    "scene_cinematic": {
      "type": "object",
      "properties": {
        "scene_types": { "type": "array", "items": { "type": "string" } },
        "camera_focus": { "type": "string" }
      }
    },
    "risk_consistency": {
      "type": "object",
      "properties": {
        "risks": { "type": "array", "items": { "type": "object" } },
        "overall_risk_level": { "type": "string", "enum": ["low", "medium", "high"] }
      }
    }
  }
}
```

---

## 四、多 Agent 编排方案

### 推荐架构：10+1 Agent

| Agent | 负责维度 | 输入 | 输出 |
|-------|---------|------|------|
| ThemeAgent | 主题立意 | 清洗后文本 + 前文摘要 | theme JSON |
| CharacterAgent | 人物系统 | 清洗后文本 + 已确认人物表 | characters JSON |
| WorldAgent | 世界观规则 | 清洗后文本 + 已确认规则 | world_rules JSON |
| PlotAgent | 情节结构 | 清洗后文本 + 前情提要 | plot_structure JSON |
| EmotionAgent | 情绪与预期 | 清洗后文本 + 情绪基线 | emotion_expectation JSON |
| StyleAgent | 文风与描写 | 清洗后文本 | style_description JSON |
| GenreAgent | 类型套路 | 清洗后文本 | genre_trope JSON |
| ForeshadowAgent | 伏笔管理 | 清洗后文本 + 伏笔清单 | foreshadowing_info JSON |
| SceneAgent | 场景镜头 | 清洗后文本 | scene_cinematic JSON |
| RiskAgent | 风险一致性 | 9 个维度结果 | risk_consistency JSON |
| **MergeAgent** | 结果合并 | 10 个维度结果 | 完整 AnalysisReportV2 |

---

## 五、开发任务拆分

### 阶段 2.1：MVP 分析闭环（2 天）

| 任务 | 负责 | 预计耗时 | 验收标准 |
|------|------|----------|----------|
| 2.1.1 文本上传与清洗 | 工部 | 0.5 天 | 支持 txt/md 格式，去格式噪声 |
| 2.1.2 单章切分 | 工部 | 0.5 天 | 按章节标记切分，保留元数据 |
| 2.1.3 10 维 Prompt 编写 | 中书省 + 吏部 | 1 天 | 每个维度独立 Prompt，符合通用模板 |
| 2.1.4 AI 调用封装 | 工部 + 户部 | 0.5 天 | 支持并发调用 10 个 Agent |
| 2.1.5 JSON Schema 校验 | 刑部 | 0.5 天 | ajv 校验，失败重试 ≤3 次 |
| 2.1.6 人类可读报告 | 礼部 | 0.5 天 | Markdown 格式，结构清晰 |
| 2.1.7 手动确认按钮 | 工部 | 0.25 天 | 前端确认按钮，触发阶段门禁 |

**阶段 2.1 验收：** 输入一章文本后可输出完整 10 维 JSON，可查看人类可读报告，可手动确认进入下一阶段。

---

### 阶段 2.2：长篇分析能力（2 天）

| 任务 | 负责 | 预计耗时 | 验收标准 |
|------|------|----------|----------|
| 2.2.1 章节级分析 | 工部 | 0.5 天 | 支持单章独立分析 |
| 2.2.2 卷级合并 | 工部 + 中书省 | 1 天 | MergeAgent 合并多章结果 |
| 2.2.3 全局人物表 | 吏部 | 0.5 天 | 人物状态随章节更新 |
| 2.2.4 全局世界观规则库 | 吏部 | 0.5 天 | 规则去重、冲突检测 |
| 2.2.5 伏笔生命周期管理 | 中书省 | 0.5 天 | 伏笔状态：未回收/已回收 |
| 2.2.6 分析结果缓存 | 户部 | 0.5 天 | 相同输入命中缓存 |

**阶段 2.2 验收：** 支持 10 章以上连续分析，人物状态可随章节更新，伏笔可追踪。

---

### 阶段 2.3：分析结果可调用（1 天）

| 任务 | 负责 | 预计耗时 | 验收标准 |
|------|------|----------|----------|
| 2.3.1 API 查询分析结果 | 工部 | 0.5 天 | GET /api/analysis/results/{id} |
| 2.3.2 按维度检索 | 工部 | 0.25 天 | 支持按维度过滤 |
| 2.3.3 按人物检索 | 工部 | 0.25 天 | 支持按人物 ID 过滤 |
| 2.3.4 生成上下文包 | 工部 + 户部 | 0.5 天 | 为续写生成提供主维度 + 约束维度 + 激发维度 |

**阶段 2.3 验收：** 可为续写生成提供上下文包，可按场景选择维度组合。

---

## 六、API 设计

### 6.1 创建分析任务

```http
POST /api/analysis/tasks
Content-Type: application/json

{
  "project_id": "proj_xxx",
  "source_id": "src_xxx",
  "scope": "chapter",
  "dimensions": ["theme", "characters", "world_rules", "plot_structure", "emotion_expectation", "style_description", "genre_trope", "foreshadowing_info", "scene_cinematic", "risk_consistency"]
}
```

**响应：**
```json
{
  "task_id": "task_xxx",
  "status": "pending",
  "created_at": "2026-05-08T15:30:00Z"
}
```

---

### 6.2 查询分析任务状态

```http
GET /api/analysis/tasks/{task_id}
```

**响应：**
```json
{
  "task_id": "task_xxx",
  "status": "completed",
  "progress": 100,
  "result": { "analysis_id": "analysis_xxx" }
}
```

---

### 6.3 获取分析结果

```http
GET /api/analysis/results/{analysis_id}
```

**响应：** AnalysisReportV2 JSON

---

### 6.4 重新分析指定维度

```http
POST /api/analysis/results/{analysis_id}/rerun
Content-Type: application/json

{
  "dimensions": ["characters", "world_rules"],
  "reason": "用户修正了人物设定"
}
```

---

### 6.5 确认分析结果

```http
POST /api/analysis/results/{analysis_id}/confirm
```

**作用：** 将分析结果标记为可进入规划模块。

---

## 七、质量门禁

| 指标 | 说明 | 阈值 |
|------|------|------|
| 完整度 | 是否覆盖主要人物、设定、情节 | ≥ 4/5 |
| 准确度 | 是否忠于原文 | ≥ 4/5 |
| 可用性 | 是否能服务续写 | ≥ 4/5 |
| 风险识别 | 是否发现潜在崩坏点 | ≥ 4/5 |
| 结构化程度 | 是否符合 JSON Schema | 100% |

**总分低于 3.5，不允许进入规划模块。**

---

## 八、硬性开发限制

1. 分析模块不得生成正文
2. 分析模块不得自动决定续写方向
3. 所有 AI 输出必须经过 JSON 校验
4. 所有不确定信息必须标记 `unknown` 或 `inference`
5. 高风险分析结果不得进入规划模块
6. 长文本不得一次性塞入模型（必须分章）
7. 分析结果必须可版本化
8. 用户修正内容优先级高于 AI 分析结果
9. 人物与世界观数据必须支持增量更新
10. Prompt 与 Schema 必须分版本管理

---

## 九、下一步交付物

| 交付物 | 预计完成 | 负责 |
|--------|----------|------|
| 10 维完整 JSON Schema | 2026-05-09 | 工部 + 刑部 |
| 10 个 Agent 的正式 Prompt 模板 | 2026-05-10 | 中书省 + 吏部 |
| MergeAgent 合并 Prompt | 2026-05-10 | 中书省 |
| RiskAgent 校验规则 | 2026-05-11 | 刑部 |
| 数据库表结构 SQL | 2026-05-11 | 工部 |
| API 接口详细文档 | 2026-05-12 | 礼部 |
| 前端分析报告页面结构 | 2026-05-12 | 礼部 + 工部 |

---

_三省六部 敬呈_ 🏛️
_版本：v2.0 | 2026-05-08_
